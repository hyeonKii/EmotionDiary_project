import { Router, Request as Req, Response as Res } from "express";
import wrapRouter from "lib/wrapRouter";
import auth from "middleware/auth";
import AppError from "lib/AppError";
const certificationRouter = Router();

certificationRouter.post(
    "/",
    wrapRouter(async (req: Req, res: Res) => {
        return Promise.resolve({ statusCode: 200, content: true });
    })
);

export default certificationRouter;
