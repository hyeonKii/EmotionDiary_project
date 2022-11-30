import express from "express";
import { config } from "dotenv";
import userRouter from "./route/user";
import accountRouter from "./route/account";
import diaryRouter from "./route/diary";
import certificationRouter from "./route/certification";
import tokenRouter from "route/token";
import error from "middleware/error";
import cors from "cors";
import { Namespace, Socket } from "socket.io";

config();

const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
// const io = new Server(server);
const io = require("socket.io")(server, {
    cors: {
        origin: "http://127.0.0.1:3001",
        methods: ["GET", "POST"],
        allowedHeaders: ["my-custom-header"],
        credentials: true,
    },
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use("/api/users", userRouter);
app.use("/api/account", accountRouter);
app.use("/api/diaries", diaryRouter);
app.use("/api/certification", certificationRouter);
app.use("/api/token", tokenRouter);

app.use(error);

io.on("connection", (socket: Socket) => {
    socket.emit("usercount", io.engine.clientsCount);
    io.emit("message", {
        message: `${socket.id}가 들어왔습니다.`,
    });
    socket.on("disconnect", () => {
        io.emit("message", {
            message: `${socket.id}가 나갔습니다.`,
        });
    });

    socket.on("message", (message: string, user: string) => {
        console.log("Message received: " + message, user);
        io.emit("message", { username: user, message });
    });
});
server.listen(4000, () => {
    console.log("chat server is loaded on " + 4000);
});
app.listen(process.env.PORT, () => {
    console.log("server is loaded on " + process.env.PORT);
});
