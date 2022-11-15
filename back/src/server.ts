import express from "express";
import { config } from "dotenv";
import userRouter from "./route/user";
import error from "middleware/error";
import cors from "cors";

config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use("/api", userRouter);

app.use(error);

app.listen(process.env.PORT, () => {
    console.log("server is loaded on " + process.env.PORT);
});
