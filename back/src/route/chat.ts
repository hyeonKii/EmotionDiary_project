import { Router, Request as Req, Response as Res } from "express";
import wrapRouter from "../lib/wrapRouter";
import AppError from "../lib/AppError";
import chatService from "../services/chatService";

const chatRouter = Router();

chatRouter.get(
    "/all",
    // auth,
    wrapRouter(async (req: Req, res: Res) => {
        const { roomname } = req.query;
        if (roomname === undefined) {
            throw new AppError("ArgumentError");
        }
        const result = await chatService.getMessege(String(roomname));
        return { statusCode: 200, content: result };
    })
);
chatRouter.get(
    "/count",
    // auth,
    wrapRouter(async (req: Req, res: Res) => {
        const { roomname, userid } = req.query;
        if (roomname === undefined || userid === undefined) {
            throw new AppError("ArgumentError");
        }
        const result = await chatService.countMessegeNotRead(String(roomname), String(userid));
        return { statusCode: 200, content: result };
    })
);

chatRouter.put(
    "/read",
    // auth,
    wrapRouter(async (req: Req, res: Res) => {
        const { roomname, userid } = req.query;
        if (roomname === undefined || userid === undefined) {
            throw new AppError("ArgumentError");
        }
        const result = await chatService.readMessage(String(roomname), String(userid));
        return { statusCode: 200, content: result };
    })
);

export default chatRouter;
