import { PrismaClient, Prisma } from "@prisma/client";

import generator from "generate-password";

import AppError from "../lib/AppError";

import mailSender from "../lib/mail";

// Todo: change error type

class CertificationService {
    private prisma = new PrismaClient();

    async generateCode(codeType: "email" | "password", email: string) {
        try {
            const isCertifiedEmail = this;

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

            mailSender(email, code, "", "isSubject?");

            return { ok: true };
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
                    code,
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
            return { ok: false };
        }

        if (result.email !== email) {
            return { ok: false };
        }

        await this.deleteCode(code);

        return { ok: true };
    }
}

export default new CertificationService();
