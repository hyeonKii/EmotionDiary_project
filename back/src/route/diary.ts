import { Router, Request as Req, Response as Res } from "express";
import wrapRouter from "lib/wrapRouter";
import diaryService from "../services/diaryService";
import auth from "middleware/auth";

const diaryRouter = Router();

//일기 create API
diaryRouter.post(
    "/diaries/write",
    wrapRouter(async (req: Req, res: Res) => {
        const { userID, title, description } = req.body;
        const result = await diaryService.writeDiary(userID, title, description);
        return Promise.resolve({ statusCode: 200, content: result });
    })
);

//조회수 증가 API
diaryRouter.patch(
    "/diaries/addviewcount",
    wrapRouter(async (req: Req, res: Res) => {
        const result = await diaryService.addViewCount(req.body.id);
        return Promise.resolve({ statusCode: 200, content: result });
    })
);
//모든 일기 조회
diaryRouter.get(
    "/diaries/all",
    wrapRouter(async (req: Req, res: Res) => {
        const result = await diaryService.getDiaryList(req.body.skip, req.body.page);
        return Promise.resolve({ statusCode: 200, content: result });
    })
);

diaryRouter.get(
    "/diaries/:id",
    wrapRouter(async (req: Req, res: Res) => {
        const { id } = req.params;
        const result = await diaryService.getDiary(id);
        return Promise.resolve({ statusCode: 200, content: result });
    })
);

diaryRouter.put(
    "/diaries/:id",
    wrapRouter(async (req: Req, res: Res) => {
        const { id } = req.params;
        const { title, description } = req.body;
        const result = await diaryService.updateDiary(id, title, description);
        return Promise.resolve({ statusCode: 200, content: result });
    })
);

// delete
diaryRouter.delete(
    "/diaries/:id",
    wrapRouter(async (req: Req, res: Res) => {
        const { id } = req.params;
        const result = await diaryService.deleteDiary(id);
        return Promise.resolve({ statusCode: 200, content: result });
    })
);

export default diaryRouter;
