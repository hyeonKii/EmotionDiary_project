import { Router, Request as Req, Response as Res } from "express";
import wrapRouter from "lib/wrapRouter";

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
    wrapRouter((req: Req, res: Res) => {
        return Promise.resolve({ statusCode: 200, content: "login" });
    })
);

// register userRouter
userRouter.post(
    "user/new",
    wrapRouter((req: Req, res: Res) => {
        return Promise.resolve({ statusCode: 200, content: "register" });
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
