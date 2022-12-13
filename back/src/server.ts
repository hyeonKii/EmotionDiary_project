import express from "express";
import { config } from "dotenv";
import userRouter from "./route/user";
import accountRouter from "./route/account";
import diaryRouter from "./route/diary";
import certificationRouter from "./route/certification";
import tokenRouter from "route/token";
import error from "middleware/error";
import cors from "cors";

config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use("/api/users", userRouter);
app.use("/api/account", accountRouter);
app.use("/api/diaries", diaryRouter);
app.use("/api/certification", certificationRouter);
app.use("/api/token", tokenRouter);

app.use(error);

app.listen(process.env.PORT, () => {
    console.log("server is loaded on " + process.env.PORT);
});
