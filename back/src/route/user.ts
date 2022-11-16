import { Router, Request as Req, Response as Res } from "express";
import wrapRouter from "lib/wrapRouter";
import userService from "../services/userService";
const userRouter = Router();

userRouter.get(
    "/ping",
    wrapRouter((req: Req, res: Res) => {
        return Promise.resolve({ statusCode: 200, content: "pong" });
    })
);

// login userRouter
userRouter.post(
    "/user",
    wrapRouter(async (req: Req, res: Res) => {
        return Promise.resolve({ statusCode: 200, content: "login" });
    })
);
//아이디 찾기
userRouter.post(
    "/user/findid",
    wrapRouter(async (req: Req, res: Res) => {
        const result = await userService.findId(req.body.email);
        return Promise.resolve({ statusCode: 200, content: result });
    })
);
//비밀번호 변경
userRouter.post(
    "/user/changepw",
    wrapRouter(async (req: Req, res: Res) => {
        const result = await userService.changePw(
            req.body.userID,
            req.body.email,
            req.body.password,
            req.body.newpassword
        );
        return Promise.resolve({ statusCode: 200, content: result });
    })
);
//비밀번호 찾기
userRouter.post(
    "/user/findpw",
    wrapRouter(async (req: Req, res: Res) => {
        const result = await userService.authId(req.body.userID, req.body.email);
        return Promise.resolve({ statusCode: 200, content: result });
    })
);

// 회원가입
userRouter.post(
    "/user/new",
    wrapRouter(async (req: Req, res: Res) => {
        const { userID, password, email, nickname } = req.body;
        const result = await userService.register({ userID, password, email, nickname });
        return Promise.resolve({ statusCode: 201, content: result });
    })
);

// logout
userRouter.delete(
    "/user",
    wrapRouter((req: Req, res: Res) => {
        return Promise.resolve({ statusCode: 200, content: "logout" });
    })
);

export default userRouter;
