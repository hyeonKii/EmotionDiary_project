import { Router, Request as Req, Response as Res } from "express";
import auth from "middleware/auth";
import wrapRouter from "lib/wrapRouter";
import certificationService from "services/certificationService";
import AppError from "lib/AppError";
import { Socket } from "socket.io";
import socket from "socket.io";
import express from "express";
import http from "http";
import chatService from "../services/chatService";
import { Message } from "../../../front/src/styles/diary/todayDiary-style";
const chatRouter = Router();
const app = express();
let createdRooms: string[] = [];
let strArr: string[] = [];
interface MessagePayload {
    roomName: string;
    msgText: string;
    userid: string;
}

const server = http.createServer(app);
export const sc = new socket.Server(server, {
    cors: {
        // origin: "http://127.0.0.1:3001",
        origin: "*",
        methods: ["GET", "POST"],
        allowedHeaders: ["my-custom-header"],
        credentials: true,
    },
});

if (sc !== undefined) {
    sc.on("connection", (socket: Socket) => {
        socket.emit("usercount", sc.engine.clientsCount);
        sc.emit("message", {
            message: `${socket.id}가 들어왔습니다.`,
        });
        socket.on("disconnect", () => {
            sc.emit("message", {
                message: `${socket.id}가 나갔습니다.`,
            });
        });

        const id = "1";
        socket.on("message", async ({ roomName, msgText, userid }: MessagePayload) => {
            console.log("Message received: ", msgText, roomName, userid);
            sc.to(roomName).emit("message", { sender: userid, msgText });
            console.log(typeof roomName, typeof msgText, typeof userid);
            const result = await chatService.saveMessege(roomName, msgText, String(userid));
            console.log(result);
        });

        socket.on("room-list", async (usermodel: string) => {
            const result = await chatService.roomList(Number(usermodel));
            console.log("한번만", usermodel, result);
            for (let value in Object.values(result.result)) {
                strArr.push(...Object.values(result.result[value]));
            }
            const uniqueArr = strArr.filter((element, index) => {
                return strArr.indexOf(element) === index;
            });
            for (let room in uniqueArr) {
                sc.emit("delete-room", uniqueArr[room]);
            }
            strArr = [];
            if (createdRooms.includes("d")) {
                console.log("중복");
                return;
            }

            for (let room in uniqueArr) {
                sc.emit("create-room", uniqueArr[room]); // 대기실 방 생성
            }
            return createdRooms;
        });

        socket.on("create-room", async (inviter: string, invitee: string, message: string) => {
            const exists = createdRooms.find((createdRoom) => createdRoom === inviter + invitee);
            sc.to(inviter + invitee).emit("message", { username: socket.id, message });
            console.log("create room", message, inviter + invitee);
            if (exists) {
                console.log("exist");
                return { success: false, payload: `${inviter + invitee} 방이 이미 존재합니다.` };
            }
            socket.join(inviter + invitee); // 기존에 없던 room으로 join하면 room이 생성됨
            createdRooms.push(inviter + invitee); // 유저가 생성한 room 목록에 추가
            sc.emit("create-room", inviter + invitee); // 대기실 방 생성
            const result = await chatService.saveChat(inviter, invitee);
            console.log(createdRooms, result);

            return { success: true, payload: inviter + invitee };
        });

        socket.on("join-room", (roomName: string) => {
            socket.join(roomName); // join room
            socket.broadcast
                .to(roomName)
                .emit("message", { message: `${socket.id}가 들어왔습니다.` });

            return { success: true };
        });
        socket.on("leave-room", (roomName: string) => {
            socket.leave(roomName); // leave room
            socket.broadcast
                .to(roomName)
                .emit("message", { message: `${socket.id}가 나갔습니다.` });

            return { success: true };
        });
    });
}
chatRouter.get(
    "/all",
    // auth,
    wrapRouter(async (req: Req, res: Res) => {
        const { roomname } = req.query;
        if (roomname === undefined) {
            throw new AppError("ArgumentError");
        }
        const result = await chatService.getMessege(String(roomname));
        return { statusCode: 200, content: result };
    })
);

server.listen(4000, () => {
    console.log("chat server is loaded on " + 4000);
});

export default chatRouter;
