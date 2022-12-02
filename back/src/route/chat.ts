import { Router } from "express";
import auth from "middleware/auth";
import wrapRouter from "lib/wrapRouter";
import certificationService from "services/certificationService";
import AppError from "lib/AppError";
import { Socket } from "socket.io";
import socket from "socket.io";
import express from "express";
import http from "http";
import diaryService from "../services/diaryService";
const chatRouter = Router();
const app = express();
let createdRooms: string[] = [];

interface MessagePayload {
    roomName: string;
    message: string;
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
        socket.on("message", async ({ roomName, message }: MessagePayload) => {
            console.log("Message received: ", message, roomName, createdRooms);
            sc.to(roomName).emit("message", { username: socket.id, message });
            const result = await diaryService.getDiary(id);
        });

        socket.on("room-list", () => {
            return createdRooms;
        });

        socket.on("create-room", (roomName: string) => {
            const exists = createdRooms.find((createdRoom) => createdRoom === roomName);
            if (exists) {
                console.log();
                return { success: false, payload: `${roomName} 방이 이미 존재합니다.` };
            }
            socket.join(roomName); // 기존에 없던 room으로 join하면 room이 생성됨
            createdRooms.push(roomName); // 유저가 생성한 room 목록에 추가
            sc.emit("create-room", roomName); // 대기실 방 생성
            return { success: true, payload: roomName };
        });

        socket.on("join-room", (roomName: string) => {
            console.log("join", roomName);
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

server.listen(4000, () => {
    console.log("chat server is loaded on " + 4000);
});

export default chatRouter;
