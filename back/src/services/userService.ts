import { PrismaClient } from "@prisma/client";
import AppError from "../lib/AppError";

class UserService {
    private prisma = new PrismaClient();

    async create(nickname: string) {
        try {
            await this.prisma.user.create({
                data: {
                    nickname,
                },
            });

            await this.prisma.$disconnect();

            return true;
        } catch (e: any) {
            throw new AppError("UserExistError");
        }
    }

    async changeNickname(userID: string, nickname: string) {
        try {
            await this.prisma.account.update({
                where: {
                    userID,
                },
                data: {
                    User: {
                        update: {
                            nickname,
                        },
                    },
                },
            });

            await this.prisma.$disconnect();

            return true;
        } catch (e: any) {
            throw new AppError("UnknownError");
        }
    }

    async block(userID: string) {
        try {
            await this.prisma.account.update({
                where: {
                    userID,
                },
                data: {
                    User: {
                        update: {
                            blocking: true,
                        },
                    },
                },
            });

            await this.prisma.$disconnect();

            return true;
        } catch (e: any) {
            throw new AppError("UnknownError");
        }
    }
}

export default new UserService();
