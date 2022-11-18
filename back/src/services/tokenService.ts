import { PrismaClient } from "@prisma/client";

class Token {
    private prisma = new PrismaClient();

    async addToken(userID: string, token: string) {
        const result = await this.prisma.token.create({
            data: {
                token,
                userID,
            },
        });

        this.prisma.$disconnect();

        return true;
    }

    async removeToken(userID: string) {
        const result = await this.prisma.token.delete({
            where: {
                userID,
            },
        });

        this.prisma.$disconnect();

        return true;
    }

    async getTokenByUserID(userID: string) {
        const token = await this.prisma.token.findUnique({
            where: {
                userID,
            },
            select: {
                token: true,
            },
        });

        this.prisma.$disconnect();

        return token;
    }

    async getUserIDByToken(token: string) {
        const result = await this.prisma.token.findUnique({
            where: {
                token,
            },
            select: {
                userID: true,
            },
        });

        this.prisma.$disconnect();

        if (result === null) {
            return null;
        }

        return result.userID;
    }
}

export default new Token();
