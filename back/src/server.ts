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
        origin: "http://localhost:3001",
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

app.get("/", (req, res) => {
    console.log(2323);
    res.sendFile(__dirname + "/index.html");
});

// io.on("connection", (socket: Socket) => {
//     console.log("a user connected");
//     socket.on("disconnect", () => {
//         console.log("user disconnected");
//     });
// });

// io.on("connection", (socket: Socket) => {
//     socket.on("chat message", (msg: string) => {
//         io.emit("chat message", msg);
//     });
// });

io.on("connection", (socket: Socket) => {
    //연결이 들어오면 실행되는 이벤트
    // socket 변수에는 실행 시점에 연결한 상대와 연결된 소켓의 객체가 들어있다.

    //socket.emit으로 현재 연결한 상대에게 신호를 보낼 수 있다.
    socket.emit("usercount", io.engine.clientsCount);

    // on 함수로 이벤트를 정의해 신호를 수신할 수 있다.
    socket.on("message", (msg: string) => {
        //msg에는 클라이언트에서 전송한 매개변수가 들어온다. 이러한 매개변수의 수에는 제한이 없다.
        console.log("Message received: " + msg);

        // io.emit으로 연결된 모든 소켓들에 신호를 보낼 수 있다.
        io.emit("message", msg);
    });
});
server.listen(4000, () => {
    console.log("chat server is loaded on " + 4000);
});
app.listen(process.env.PORT, () => {
    console.log("server is loaded on " + process.env.PORT);
});
