import type { NextFunction, Request, Response } from "express";
import { Prisma } from "@prisma/client";
import AppError from "./AppError";

type RouterFunction = (
    request: Request,
    response: Response
) => Promise<{ statusCode: number; content: Object | string | null }>;

const wrapRouter =
    (fn: RouterFunction) => async (req: Request, res: Response, next: NextFunction) => {
        try {
            const result = await fn(req, res);

            res.status(result.statusCode).send(result.content);
        } catch (e: any) {
            if (e instanceof Prisma.PrismaClientKnownRequestError) {
                if (e.code === "P2002") {
                    next(new AppError("UserExistError"));
                    return;
                }
            }
            if (e instanceof Prisma.PrismaClientValidationError) {
                next(new AppError("ArgumentError"));
            }
            if (e instanceof AppError === false) {
                console.log("\x1b[31m%s\x1b[0m", e.message);
                next(new AppError("UnknownError"));
            }

            next(e);
        }
    };

export default wrapRouter;
