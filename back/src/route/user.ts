import { Router, Request as Req, Response as Res } from "express";
import wrapRouter from "lib/wrapRouter";
import userService from "../services/userService";
import tokenService from "../services/tokenService";
import auth from "middleware/auth";
import AppError from "lib/AppError";
import accountService from "services/accountService";

const userRouter = Router();

//닉네임 변경
userRouter.patch(
    "/nickname",
    auth,
    wrapRouter(async (req: Req, res: Res) => {
        console.log("test");
        const { nickname } = req.body;

        if (nickname === undefined) {
            throw new AppError("BodyDataError");
        }

        const result = await userService.changeNickname(req.userID!, nickname);
        return { statusCode: 200, content: result };
    })
);

//회원 탈퇴
userRouter.delete(
    "/withdrawal",
    auth,
    wrapRouter(async (req: Req, res: Res) => {
        const result = await userService.block(req.userID!);

        return { statusCode: 200, content: result };
    })
);

export default userRouter;
