import type { Request as Req, Response as Res, NextFunction } from "express";
import AppError from "lib/AppError";
import { generateToken, verifyToken } from "lib/token";
import TokenService from "../services/tokenService";

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

    // when accessToken is expired and refreToken is expired
    if (accessPayload === null && refreshPayload === null) {
        next(new AppError("InvalidTokenError"));

        return;
    }

    // when accessToken is expired but refreToken is alive
    if (accessPayload === null && refreshPayload !== null) {
        const userID = await TokenService.getUserIDByToken(refreshToken);

        req.userID = userID;

        next();

        return;
    }

    // when accessToken is alive but refreshToken is expired
    if (accessPayload !== null && refreshPayload === null) {
        const result = generateToken("refresh", "");

        req.refreshToken = result;

        next();

        return;
    }

    // when accessToken is alive and refreshToken is alive
    if (accessPayload !== null && refreshPayload !== null) {
        const userID = await TokenService.getUserIDByToken(refreshToken);

        if (accessPayload.data !== userID) {
            throw new AppError("InvalidTokenError");
        }

        req.userID = userID;

        next();

        return;
    }
};

export default auth;
