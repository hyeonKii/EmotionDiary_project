import { PrismaClient, User } from "@prisma/client";
import AppError from "lib/AppError";

class DiaryService {
    prisma = new PrismaClient();

    async writeDiary(userID: string, title: string, description: string) {
        const result = await this.prisma.diary.create({
            data: {
                title,
                description,
                user: {
                    connect: {
                        userID,
                    },
                },
            },
        });

        await this.prisma.$disconnect();
        return result;
    }

    async addViewCount(diaryID: number) {
        const result = await this.prisma.diary.update({
            where: {
                id: Number(diaryID),
            },
            data: {
                view: {
                    increment: 1,
                },
            },
        });
        await this.prisma.$disconnect();
        return result;
    }

    async deleteDiary(id: string) {
        await this.prisma.diary.delete({
            where: { id: Number(id) },
        });
        await this.prisma.$disconnect();
        return { result: true };
    }

    async updateDiary(id: string, title: string, description: string) {
        const postUpdate = await this.prisma.diary.update({
            where: { id: Number(id) },
            data: { title, description },
        });
        await this.prisma.$disconnect();
        return postUpdate;
    }

    async getDiary(id: string) {
        const postData = await this.prisma.diary.findUnique({
            where: { id: Number(id) },
        });
        await this.prisma.$disconnect();
        return postData;
    }

    async getDiaryList(count: string, page: string) {
        const postDatas = await this.prisma.diary.findMany({
            take: Number(count),
            skip: (Number(page) - 1) * Number(count),
            select: {
                id: true,
                author: true,
                title: true,
                description: true,
                view: true,
                createdAt: true,
                updatedAt: true,
            },
        });
        await this.prisma.$disconnect();
        return postDatas;
    }
}

export default new DiaryService();
