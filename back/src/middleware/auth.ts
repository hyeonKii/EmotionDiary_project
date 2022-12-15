import type { Request as Req, Response as Res, NextFunction } from "express";
import AppError from "../lib/AppError";
import { verifyToken } from "../lib/token";
import tokenService from "../services/tokenService";

const auth = async (req: Req, res: Res, next: NextFunction) => {
    let accessToken = req.headers.authorization;
    const refreshToken = req.headers.refreshtoken;

    // if there are no token in header, it occurs error
    if (accessToken === null || typeof accessToken !== "string") {
        next(new AppError("InvalidTokenError"));

        return;
    }

    if (refreshToken === null || typeof refreshToken !== "string") {
        next(new AppError("InvalidTokenError"));

        return;
    }

    // whether refreshToken is in db or not
    const checkRefreshToken = await tokenService.checkRefreshToken(refreshToken);

    if (checkRefreshToken === false) {
        next(new AppError("InvalidTokenError"));

        return;
    }

    // split accessToken
    accessToken = accessToken.split(" ")[1];

    const accessPayload = verifyToken(accessToken);
    const refreshPayload = verifyToken(refreshToken);

    // check payloads
    if (
        accessPayload === "InvalidTokenError" ||
        typeof accessPayload === "string" ||
        accessPayload === undefined
    ) {
        next(new AppError("InvalidTokenError"));

        return;
    }

    // when accessToken or refreshToken expires
    if (accessPayload === null || refreshPayload === null) {
        next(new AppError("InvalidTokenError"));

        return;
    }

    req.userID = accessPayload.data;
    req.refreshToken = refreshToken;

    next();
};

export default auth;
