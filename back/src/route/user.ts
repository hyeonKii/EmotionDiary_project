import { Router, Request as Req, Response as Res } from "express";
import wrapRouter from "lib/wrapRouter";
import userService from "../services/userService";
import tokenService from "../services/tokenService";
import auth from "middleware/auth";
import AppError from "lib/AppError";

const userRouter = Router();

userRouter.post(
    "/ping",
    auth,
    wrapRouter((req: Req, res: Res) => {
        tokenService.updateRefreshToken(req.userID!);
        return Promise.resolve({ statusCode: 200, content: "pong" });
    })
);

// login userRouter
userRouter.post(
    "/",
    wrapRouter(async (req: Req, res: Res) => {
        const result = await userService.login(req.body.userID, req.body.password);
        return { statusCode: 200, content: result };
    })
);
//회원가입
userRouter.post(
    "/new",
    wrapRouter(async (req: Req, res: Res) => {
        const { userID, password, email, nickname, emailVerification } = req.body;
        console.log("body: ", userID, password, email, nickname);
        const result = await userService.register({
            userID,
            password,
            email,
            nickname,
            emailVerification,
        });

        return { statusCode: 201, content: result };
    })
);

//아이디 찾기
userRouter.post(
    "/findid",
    wrapRouter(async (req: Req, res: Res) => {
        const result = await userService.findID(req.body.email);

        return { statusCode: 200, content: result };
    })
);

userRouter.post(
    "/users/emailcheck",
    wrapRouter(async (req: Req, res: Res) => {
        console.log(req.body);
        const result = await userService.emailVerification(req.body.email);

        return { statusCode: 200, content: result };
    })
);

//비밀번호 변경
userRouter.post(
    "/changepassword",
    auth,
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
    "/findpassword",
    wrapRouter(async (req: Req, res: Res) => {
        const result = await userService.findPassword(req.body.email);
        return Promise.resolve({ statusCode: 200, content: result });
    })
);

//닉네임 변경
userRouter.post(
    "/changenickname",
    auth,
    wrapRouter(async (req: Req, res: Res) => {
        const result = await userService.changeNickname(req.body.userID, req.body.nickname);
        return Promise.resolve({ statusCode: 200, content: result });
    })
);

//비밀번호 인증
userRouter.post(
    "/authpassword",
    auth,
    wrapRouter(async (req: Req, res: Res) => {
        const result = await userService.authPassword(req.body.userID, req.body.email);
        return Promise.resolve({ statusCode: 200, content: result });
    })
);

//회원 탈퇴
userRouter.post(
    "/withdrawal",
    auth,
    wrapRouter(async (req: Req, res: Res) => {
        const result = await userService.withdrawal(req.body.userID);
        return Promise.resolve({ statusCode: 200, content: result });
    })
);

// logout
userRouter.delete(
    "/",
    auth,
    wrapRouter(async (req: Req, res: Res) => {
        const userID = req.userID;
        if (typeof userID !== "string") {
            throw new AppError("ArgumentError");
        }
        const result = await userService.logoutUser(userID);
        return Promise.resolve({ statusCode: 200, content: result });
    })
);

export default userRouter;
