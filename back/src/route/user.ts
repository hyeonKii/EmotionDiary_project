import { Router, Request as Req, Response as Res } from "express";
import wrapRouter from "lib/wrapRouter";
import userService from "../services/userService.js";
const userRouter = Router();

userRouter.get(
    "/ping",
    wrapRouter((req: Req, res: Res) => {
        return Promise.resolve({ statusCode: 200, content: "pong" });
    })
);

// login userRouter
userRouter.post(
    "user",
    wrapRouter(async (req: Req, res: Res) => {
        return Promise.resolve({ statusCode: 200, content: "login" });
    })
);

// register userRouter
userRouter.post(
    "user/new",
    wrapRouter(async (req: Req, res: Res) => {
        const { id, password } = req.body;
        const result = await userService.loginUser({ id, password });

        return Promise.resolve({ statusCode: 201, content: result });
    })
);

// logout
userRouter.delete(
    "user",
    wrapRouter((req: Req, res: Res) => {
        return Promise.resolve({ statusCode: 200, content: "logout" });
    })
);

export default userRouter;
