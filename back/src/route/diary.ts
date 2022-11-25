import { Router, Request as Req, Response as Res } from "express";
import wrapRouter from "lib/wrapRouter";
import diaryService from "../services/diaryService";
import auth from "middleware/auth";
import AppError from "lib/AppError";
const diaryRouter = Router();

//일기 create API
diaryRouter.post(
    "/write",
    auth,
    wrapRouter(async (req: Req, res: Res) => {
        const { userID, title, description, nickname } = req.body;
        if (
            typeof userID !== "string" ||
            typeof title !== "string" ||
            typeof description !== "string"
        ) {
            throw new AppError("ArgumentError");
        }
        const result = await diaryService.writeDiary(userID, title, description);
        return { statusCode: 200, content: true };
    })
);

//조회수 증가 API
diaryRouter.patch(
    "/viewcount",
    auth,
    wrapRouter(async (req: Req, res: Res) => {
        const result = await diaryService.addViewCount(req.body.id);
        return { statusCode: 200, content: result };
    })
);

//모든 일기 조회
diaryRouter.get(
    "/all",
    auth,
    wrapRouter(async (req: Req, res: Res) => {
        const { count, page } = req.query;
        if (count === undefined || page === undefined) {
            throw new AppError("ArgumentError");
        }
        const result = await diaryService.getDiaryList(Number(count), Number(page));
        return { statusCode: 200, content: result };
    })
);

diaryRouter.get(
    "/all/emotion",
    // auth,
    wrapRouter(async (req: Req, res: Res) => {
        const { count, page } = req.query;
        const { emotion } = req.body;
        if (count === undefined || page === undefined) {
            throw new AppError("ArgumentError");
        }
        const result = await diaryService.getEmotionDiaryList(Number(count), Number(page), emotion);
        return { statusCode: 200, content: result };
    })
);

diaryRouter.get(
    "/:id",
    auth,
    wrapRouter(async (req: Req, res: Res) => {
        const { id } = req.params;
        const result = await diaryService.getDiary(id);
        return { statusCode: 200, content: result };
    })
);

diaryRouter.put(
    "/:id",
    auth,
    wrapRouter(async (req: Req, res: Res) => {
        const { id } = req.params;
        const { title, description } = req.body;
        const result = await diaryService.updateDiary(id, title, description);
        return Promise.resolve({ statusCode: 200, content: result });
    })
);

diaryRouter.put(
    "/emotion/:id",
    auth,
    wrapRouter(async (req: Req, res: Res) => {
        const { id } = req.params;
        const { emotion } = req.body;
        const result = await diaryService.changeEmotion(id, emotion);
        return Promise.resolve({ statusCode: 200, content: result });
    })
);

// delete
diaryRouter.delete(
    "/:id",
    auth,
    wrapRouter(async (req: Req, res: Res) => {
        const { id } = req.params;
        const result = await diaryService.deleteDiary(id);
        return Promise.resolve({ statusCode: 200, content: result });
    })
);

export default diaryRouter;
