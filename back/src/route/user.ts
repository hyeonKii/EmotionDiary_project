import { Router, Request as Req, Response as Res } from "express";
import wrapRouter from "lib/wrapRouter";
import userService from "../services/userService";
import auth from "middleware/auth";

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
        const result = await userService.login(req.body.userID, req.body.password);

        return { statusCode: 200, content: result };
    })
);

userRouter.post(
    "/user/new",
    wrapRouter(async (req: Req, res: Res) => {
        const { userID, password, email, nickname } = req.body;
        const result = await userService.register({ userID, password, email, nickname });

        return { statusCode: 201, content: result };
    })
);

//아이디 찾기
userRouter.post(
    "/user/findid",
    wrapRouter(async (req: Req, res: Res) => {
        const result = await userService.findID(req.body.email);

        return { statusCode: 200, content: result };
    })
);
//비밀번호 변경
userRouter.post(
    "/user/changepassword",
    wrapRouter(async (req: Req, res: Res) => {
        const result = await userService.changePassword(
            req.body.userID,
            req.body.email,
            req.body.password,
            req.body.newpassword
        );

        return { statusCode: 200, content: result };
    })
);
//비밀번호 찾기
userRouter.post(
    "/user/findpassword",
    wrapRouter(async (req: Req, res: Res) => {
        const result = await userService.findPassword(req.body.userID, req.body.email);
        return Promise.resolve({ statusCode: 200, content: result });
    })
);

//비밀번호 인증
userRouter.post(
    "/user/authpassword",
    wrapRouter(async (req: Req, res: Res) => {
        const result = await userService.findPassword(req.body.userID, req.body.email);
        return Promise.resolve({ statusCode: 200, content: result });
    })
);

// 회원가입

// logout
userRouter.delete(
    "/user",
    wrapRouter((req: Req, res: Res) => {
        return Promise.resolve({ statusCode: 200, content: "logout" });
    })
);

export default userRouter;
