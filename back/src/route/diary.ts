import { Router, Request as Req, Response as Res } from "express";
import axios from "axios";
import wrapRouter from "../lib/wrapRouter";
import diaryService from "../services/diaryService";
import auth from "../middleware/auth";
import AppError from "../lib/AppError";
const diaryRouter = Router();

//일기 create API
diaryRouter.post(
    "/write",
    auth,
    wrapRouter(async (req: Req, res: Res) => {
        const { title, description, privateDiary, createdAt } = req.body;
        if (title && description && privateDiary === undefined) {
            throw new AppError("ArgumentError");
        }

        const response = await axios.post("http://localhost:8000/api/emotion-check", {
            text: description,
        });

        await diaryService.writeDiary(
            req.userID!,
            title,
            description,
            response.data.result[0],
            privateDiary,
            createdAt
        );

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

// privateddiary => 내가 쓴 일기
//모든 일기 조회
diaryRouter.get(
    "/all",
    // auth,
    wrapRouter(async (req: Req, res: Res) => {
        const { count, page, privatediary, emotion } = req.query;
        if (
            count === undefined ||
            page === undefined ||
            privatediary === undefined ||
            emotion === undefined
        ) {
            throw new AppError("ArgumentError");
        }
        const result = await diaryService.getDiaryList(
            req.userID!,
            Number(count),
            Number(page),
            String(privatediary),
            String(emotion)
        );
        return { statusCode: 200, content: result };
    })
);

//나의 일기 조회
diaryRouter.get(
    "/mine",
    auth,
    wrapRouter(async (req: Req, res: Res) => {
        const { count, page } = req.query;
        if (count === undefined || page === undefined) {
            throw new AppError("ArgumentError");
        }
        const result = await diaryService.getMyDiaryList(req.userID!, Number(count), Number(page));
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

diaryRouter.get(
    "/",
    auth,
    wrapRouter(async (req: Req, res: Res) => {
        const { datetime } = req.query;
        const date = new Date(String(datetime));
        const nextDate = new Date(String(datetime));
        nextDate.setMonth(date.getMonth() + 1);
        const result = await diaryService.getDiaryByMonth(req.userID!, date, nextDate);

        return { statusCode: 200, content: result };
    })
);

diaryRouter.get(
    "/period/all",
    auth,
    wrapRouter(async (req: Req, res: Res) => {
        const now = new Date();
        const year = now.getFullYear();
        const month = now.getMonth() + 1;
        const date = now.getDate();

        const day = `${year}-${month >= 10 ? month : "0" + month}-${
            date >= 10 ? date : "0" + date
        }`;

        // week 기간 설정
        const weekStart = new Date(day);
        weekStart.setDate(new Date().getDate() - 7);

        const weekEnd = new Date(weekStart);
        weekEnd.setDate(weekStart.getDate() + 1);

        // month 기간 설정
        const monthStart = new Date(day);
        monthStart.setMonth(new Date().getMonth() - 1);

        const monthEnd = new Date(monthStart);
        monthEnd.setDate(monthStart.getDate() + 1);

        // year 기간 설정
        const yearStart = new Date(day);
        yearStart.setFullYear(new Date().getFullYear() - 1);

        const yearEnd = new Date(yearStart);
        yearEnd.setDate(yearStart.getDate() + 1);

        const result = await Promise.all([
            diaryService.getAllDiaryByDate(req.userID!, weekStart, weekEnd),
            diaryService.getAllDiaryByDate(req.userID!, monthStart, monthEnd),
            diaryService.getAllDiaryByDate(req.userID!, yearStart, yearEnd),
        ]);

        return { statusCode: 200, content: result };
    })
);

diaryRouter.put(
    "/:id",
    // auth,
    wrapRouter(async (req: Req, res: Res) => {
        const { id } = req.params;
        const { title, description, privateDiary } = req.body;
        const result = await diaryService.updateDiary(id, title, description, privateDiary);
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

diaryRouter.get(
    "/period/all",
    auth,
    wrapRouter(async (req: Req, res: Res) => {
        const now = new Date();
        const year = now.getFullYear();
        const month = now.getMonth() + 1;
        const date = now.getDate();

        const day = `${year}-${month >= 10 ? month : "0" + month}-${
            date >= 10 ? date : "0" + date
        }`;

        // week 기간 설정
        const weekStart = new Date(day);
        weekStart.setDate(new Date().getDate() - 7);

        const weekEnd = new Date(weekStart);
        weekEnd.setDate(weekStart.getDate() + 1);

        // month 기간 설정
        const monthStart = new Date(day);
        monthStart.setMonth(new Date().getMonth() - 1);

        const monthEnd = new Date(monthStart);
        monthEnd.setDate(monthStart.getDate() + 1);

        // year 기간 설정
        const yearStart = new Date(day);
        yearStart.setFullYear(new Date().getFullYear() - 1);

        const yearEnd = new Date(yearStart);
        yearEnd.setDate(yearStart.getDate() + 1);

        const result = await Promise.all([
            diaryService.getDiaryByMonth(req.userID!, weekStart, weekEnd),
            diaryService.getDiaryByMonth(req.userID!, monthStart, monthEnd),
            diaryService.getDiaryByMonth(req.userID!, yearStart, yearEnd),
        ]);

        return { statusCode: 200, content: result };
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
