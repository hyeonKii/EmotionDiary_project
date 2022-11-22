import { Router } from "express";
import auth from "middleware/auth";
import wrapRouter from "lib/wrapRouter";
import AppError from "lib/AppError";
import tokenService from "services/tokenService";

const tokenRouter = Router();

tokenRouter.put(
    "/refresh",
    auth,
    wrapRouter(async (req, res) => {
        if (req.userID === undefined) {
            // Todo change error type
            throw new AppError("ArgumentError");
        }

        const refreshToken = await tokenService.updateRefreshToken(req.userID);

        return { statusCode: 200, content: refreshToken };
    })
);

export default tokenRouter;
