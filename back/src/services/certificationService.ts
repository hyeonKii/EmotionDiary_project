import { PrismaClient, Prisma } from "@prisma/client";

import generator from "generate-password";

import AppError from "../lib/AppError";

import mailSender from "../lib/mail";

// Todo: change error type

class CertificationService {
    private prisma = new PrismaClient();

    async createCode(email: string) {
        try {
            const code = generator.generate({ length: 8, numbers: true });

            await this.prisma.certification.create({
                data: {
                    email: email,

                    code: code,
                },
            });

            this.prisma.$disconnect();

            mailSender(email, code, "아래의 링크를 눌러서 회원가입을 마쳐주세요.");

            return true;
        } catch (e: any) {
            if (e instanceof Prisma.PrismaClientKnownRequestError) {
                throw new AppError("ArgumentError");
            }
        }
    }

    async deleteCode(code: string) {
        try {
            await this.prisma.certification.delete({
                where: {
                    code: code,
                },
            });

            this.prisma.$disconnect();

            return true;
        } catch (e: any) {
            if (e instanceof Prisma.PrismaClientKnownRequestError) {
                throw new AppError("ArgumentError");
            }
        }
    }

    async certifyCode(code: string) {
        const result = await this.prisma.certification.findUnique({
            where: {
                code: code,
            },
        });

        this.prisma.$disconnect();

        if (result === null) {
            return false;
        }

        return true;
    }
}

export default new CertificationService();
