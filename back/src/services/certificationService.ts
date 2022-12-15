import { PrismaClient, Prisma } from "@prisma/client";

import generator from "generate-password";

import AppError from "../lib/AppError";

import mailSender from "../lib/mail";

//TODO: change error type

const isCertifiedEmail = (email: string) => {
    const reg = /^[\w-\.]+@([\w-]+\.)+com$/;

    if (!reg.test(email)) {
        return true;
    }

    return false;
};

class CertificationService {
    private prisma = new PrismaClient();

    async generateCode(codeType: "email" | "password" | "id", email: string) {
        const result = await this.prisma.account.findUnique({
            where: {
                email: email,
            },
        });

        if (result === null && (codeType === "password" || codeType === "id")) {
            throw new AppError("UserNotExistError");
        }

        if (result !== null && codeType === "email") {
            throw new AppError("UserExistError");
        } else {
            try {
                let length = 8;

                if (codeType === "password") length = 12;
                const code = generator.generate({ length: 8, numbers: true });

                await this.prisma.certification.create({
                    data: {
                        email: email,
                        code: code,
                    },
                });
                mailSender(email, code, "", "isSubject?");
            } catch (e: any) {
                if (e instanceof Prisma.PrismaClientKnownRequestError) {
                    console.log(e.message);
                    throw new AppError("ArgumentError");
                }
            }
        }

        await this.prisma.$disconnect();
        return { result: true };
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
