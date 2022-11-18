import { Router, Request as Req, Response as Res } from "express";
import wrapRouter from "lib/wrapRouter";
import diaryService from "../services/diaryService";
const diaryRouter = Router();

diaryRouter.get(
    "/diary/ping",
    wrapRouter((req: Req, res: Res) => {
        return Promise.resolve({ statusCode: 200, content: "pong" });
    })
);
//일기 create API
diaryRouter.post(
    "/diary/writediary",
    wrapRouter(async (req: Req, res: Res) => {
        const { userID, title, description } = req.body;
        const result = await diaryService.writeDiary(userID, title, description);
        return Promise.resolve({ statusCode: 200, content: result });
    })
);

//조회수 증가 API
diaryRouter.post(
    "/diary/addviewcount",
    wrapRouter(async (req: Req, res: Res) => {
        const result = await diaryService.addViewCount(req.body.id);
        return Promise.resolve({ statusCode: 200, content: result });
    })
);

diaryRouter.get(
    "/diary/all",
    wrapRouter(async (req: Req, res: Res) => {
        const result = await diaryService.getDiaryList();
        return Promise.resolve({ statusCode: 200, content: result });
    })
);

diaryRouter.get(
    "/diary/:id",
    wrapRouter(async (req: Req, res: Res) => {
        const { id } = req.params;
        const result = await diaryService.getDiary(id);
        return Promise.resolve({ statusCode: 200, content: result });
    })
);

diaryRouter.put(
    "/diary/:id",
    wrapRouter(async (req: Req, res: Res) => {
        const { id } = req.params;
        const { title, description } = req.body;
        const result = await diaryService.updateDiary(id, title, description);
        return Promise.resolve({ statusCode: 200, content: result });
    })
);

// delete
diaryRouter.delete(
    "/diary/:id",
    wrapRouter(async (req: Req, res: Res) => {
        const { id } = req.params;
        const result = await diaryService.deleteDiary(id);
        return Promise.resolve({ statusCode: 200, content: result });
    })
);

export default diaryRouter;
