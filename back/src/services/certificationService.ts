import { PrismaClient, Prisma } from "@prisma/client";
import accountService from "./accountService";
import generator from "generate-password";

import AppError from "../lib/AppError";

import mailSender from "../lib/mail";

class CertificationService {
    private prisma = new PrismaClient();

    async generateCode(email: string) {
        try {
            const result = await this.prisma.account.findUnique({
                where: {
                    email: email,
                },
                select: {
                    userID: true,
                },
            });

            if (result !== null) {
                // throw new AppError("UserExistError");
                return { result: false };
            }

            const code = generator.generate({ length: 8, numbers: true });

            await this.prisma.certification.create({
                data: {
                    email: email,
                    code: code,
                },
            });

            mailSender(email, code, "", "이메일 인증 코드");
            await this.prisma.$disconnect();
            return { result: true };
        } catch (e: any) {
            if (e instanceof Prisma.PrismaClientKnownRequestError) {
                throw new AppError("ArgumentError");
            }
            return { result: false };
        }
    }

    async generateTempPassword(email: string) {
        try {
            const result = await this.prisma.account.findUnique({
                where: {
                    email: email,
                },
                select: {
                    userID: true,
                },
            });

            if (result === null) {
                // throw new AppError("UserNotExistError");
                return { result: false };
            }

            const code = generator.generate({ length: 12, numbers: true });

            await this.prisma.certification.create({
                data: {
                    email: email,
                    code: code,
                },
            });

            await accountService.changePassword(result.userID, code);

            mailSender(email, code, "", "임시 비밀번호");

            await this.prisma.$disconnect();
            return { result: true };
        } catch (e: any) {
            if (e instanceof Prisma.PrismaClientKnownRequestError) {
                throw new AppError("ArgumentError");
            }
            return { result: false };
        }
    }

    async deleteCode(code: string) {
        try {
            await this.prisma.certification.delete({
                where: {
                    code,
                },
            });
        } catch (e: any) {
            if (e instanceof Prisma.PrismaClientKnownRequestError) {
                throw new AppError("ArgumentError");
            }
        }
        await this.prisma.$disconnect();
        return true;
    }

    async certifyEmailByCode(email: string, code: string) {
        const result = await this.prisma.certification.findUnique({
            where: {
                code,
            },
            select: {
                email: true,
            },
        });

        this.prisma.$disconnect();

        if (result === null) {
            return { ok: false };
        }

        if (result.email !== email) {
            return { ok: false };
        }

        await this.deleteCode(code);
        return { result: true };
    }
}

export default new CertificationService();
