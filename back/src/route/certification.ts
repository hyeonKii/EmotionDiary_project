import { Router } from "express";
import wrapRouter from "../lib/wrapRouter";
import certificationService from "../services/certificationService";
import AppError from "../lib/AppError";

const certificationRouter = Router();

// 이메일로 이메일 인증 코드 또는 임시 비밀번호 발송
certificationRouter.post(
    "/send",
    wrapRouter(async (req, res) => {
        const { email, target } = req.body;

        if (email === undefined) {
            throw new AppError("BodyDataError");
        }

        let result = null;

        switch (target) {
            case "email":
                result = await certificationService.generateCode(email);
                if (result.result == false) {
                    throw new AppError("UserExistError");
                }
                break;
            case "password":
                result = await certificationService.generateTempPassword(email);
                if (result.result == false) {
                    throw new AppError("UserNotExistError");
                }
                break;
            default:
                throw new AppError("ArgumentError");
        }

        return { statusCode: 200, content: result };
    })
);

// 코드 인증
certificationRouter.post(
    "/certify",
    // auth,
    wrapRouter(async (req, res) => {
        const { email, code } = req.body;
        if (email === undefined || code === undefined) {
            throw new AppError("BodyDataError");
        }

        const result = await certificationService.certifyEmailByCode(email, code);

        return { statusCode: 200, content: result };
    })
);

export default certificationRouter;
