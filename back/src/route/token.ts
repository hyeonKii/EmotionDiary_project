import { Router } from "express";
import auth from "../middleware/auth";
import wrapRouter from "../lib/wrapRouter";
import tokenService from "../services/tokenService";

const tokenRouter = Router();

tokenRouter.get(
    "/refresh",
    auth,
    wrapRouter(async (req, res) => {
        const refreshToken = await tokenService.updateRefreshToken(req.userID!);

        return { statusCode: 200, content: refreshToken };
    })
);

tokenRouter.get(
    "/access",
    auth,
    wrapRouter(async (req, res) => {
        const accessToken = await tokenService.getAccessToken(req.refreshToken!);

        return { statusCode: 200, content: accessToken };
    })
);

export default tokenRouter;
