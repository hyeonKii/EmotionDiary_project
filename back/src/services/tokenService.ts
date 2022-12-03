import { PrismaClient } from "@prisma/client";
import AppError from "../lib/AppError";
import { generateToken } from "../lib/token";

class Token {
    private prisma = new PrismaClient();

    async addRefreshToken(userID: string) {
        const refreshToken = generateToken("refresh", "");

        // Todo: if result is error, return value is true or false by try-catch
        await this.prisma.token.create({
            data: {
                userID: userID,
                token: refreshToken,
            },
        });

        this.prisma.$disconnect();

        return refreshToken;
    }

    async removeRefreshToken(userID: string) {
        const result = await this.prisma.token.delete({
            where: {
                userID,
            },
        });

        this.prisma.$disconnect();

        if (result === null) {
            return { ok: false };
        }

        return { ok: true };
    }
    async getRefreshToken(userID: string) {
        const result = await this.prisma.token.findUnique({
            where: {
                userID,
            },
            select: {
                token: true,
            },
        });

        this.prisma.$disconnect();

        if (result === null) {
            return null;
        }

        return result.token;
    }

    async getAccessToken(refreshToken: string) {
        const result = await this.prisma.token.findUnique({
            where: {
                token: refreshToken,
            },
            select: {
                userID: true,
            },
        });

        this.prisma.$disconnect();

        if (result === null) {
            throw new AppError("InvalidTokenError");
        }

        const accessToken = generateToken("access", result.userID);

        return accessToken;
    }

    async updateRefreshToken(userID: string) {
        const isExist = await this.getRefreshToken(userID);

        if (isExist === null) {
            throw new AppError("InvalidTokenError");
        }

        const refreshToken = generateToken("refresh", "");

        // Todo: if result is error, return value is true or false by try-catch
        await this.prisma.token.update({
            where: {
                userID,
            },
            data: {
                token: refreshToken,
            },
        });

        this.prisma.$disconnect();

        return refreshToken;
    }

    async checkRefreshToken(refreshToken: string) {
        const result = await this.prisma.token.findUnique({
            where: {
                token: refreshToken,
            },
        });

        this.prisma.$disconnect();

        if (result === null) {
            return false;
        }

        return true;
    }
}

export default new Token();
