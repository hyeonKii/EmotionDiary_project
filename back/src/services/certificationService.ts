import { PrismaClient, Prisma } from "@prisma/client";

import generator from "generate-password";

import AppError from "../lib/AppError";

import mailSender from "../lib/mail";

// Todo: change error type

class CertificationService {
    private prisma = new PrismaClient();

    async createCode(codeType: "email" | "password", email: string) {
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

            this.prisma.$disconnect();

            mailSender(email, code, "");

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
            return false;
        }

        if (result.email !== email) {
            return false;
        }

        return true;
    }
}

export default new CertificationService();
