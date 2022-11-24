import { Router, Request as Req, Response as Res } from "express";
import wrapRouter from "lib/wrapRouter";
import userService from "../services/userService";
import tokenService from "../services/tokenService";
import auth from "middleware/auth";
import AppError from "lib/AppError";
import accountService from "services/accountService";

const accountRouter = Router();

accountRouter.post(
    "/ping",
    auth,
    wrapRouter((req: Req, res: Res) => {
        tokenService.updateRefreshToken(req.userID!);
        return Promise.resolve({ statusCode: 200, content: "pong" });
    })
);

//회원가입
accountRouter.post(
    "/new",
    wrapRouter(async (req: Req, res: Res) => {
        const { userID, password, email, nickname } = req.body;

        if (userID && password && email && nickname) {
            throw new AppError("BodyDataError");
        }

        const result = await accountService.register({
            userID,
            password,
            email,
            nickname,
        });

        return { statusCode: 201, content: result };
    })
);

// 유저 데이터 가져오기
accountRouter.post(
    "/login",
    wrapRouter(async (req: Req, res: Res) => {
        const { userID, password } = req.body;

        if (userID && password) {
            throw new AppError("BodyDataError");
        }

        const result = await accountService.login(userID, password);

        return { statusCode: 200, content: result };
    })
);

// 유저 데이터 가져오기
accountRouter.get(
    "/",
    auth,
    wrapRouter(async (req: Req, res: Res) => {
        const result = await accountService.getUserByUserID(req.userID!);

        return { statusCode: 200, content: result };
    })
);

// 로그아웃
accountRouter.delete(
    "/",
    auth,
    wrapRouter(async (req: Req, res: Res) => {
        const result = await accountService.logout(req.userID!);

        return { statusCode: 200, content: result };
    })
);

//아이디 찾기
accountRouter.get(
    "/user-id",
    wrapRouter(async (req: Req, res: Res) => {
        const { email, code } = req.body;

        if (email && code) {
            throw new AppError("BodyDataError");
        }

        const result = await accountService.getUserIDByCertification(email, code);

        return { statusCode: 200, content: result };
    })
);

//비밀번호 변경
accountRouter.put(
    "/password",
    auth,
    wrapRouter(async (req: Req, res: Res) => {
        const { password } = req.body;

        if (password) {
            throw new AppError("BodyDataError");
        }

        const result = await accountService.changePassword(req.userID!, password);

        return { statusCode: 200, content: result };
    })
);

// 계정 인증 확인
accountRouter.patch(
    "/certify",
    auth,
    wrapRouter(async (req: Req, res: Res) => {
        const { isCertified } = req.body;

        if (isCertified) {
            throw new AppError("BodyDataError");
        }

        const result = await accountService.certify(req.userID!, isCertified);

        return { statusCode: 200, content: result };
    })
);

export default accountRouter;
