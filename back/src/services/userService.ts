import { PrismaClient, Prisma } from "@prisma/client";
import AppError from "../lib/AppError";
class UserService {
    private prisma = new PrismaClient();

    async create(nickname: string, email: string, userID: string, password: string) {
        try {
            await this.prisma.user.create({
                data: {
                    nickname,
                    Account: {
                        create: {
                            email,
                            userID,
                            password,
                        },
                    },
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

            return { ok: true };
        } catch (e: any) {
            throw new AppError("UpdateError");
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

            return { ok: true };
        } catch (e: any) {
            throw new AppError("UpdateError");
        }
    }
}

export default new UserService();
