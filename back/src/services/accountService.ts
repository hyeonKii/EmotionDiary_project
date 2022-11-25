import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import AppError from "../lib/AppError";
import { generateToken } from "../lib/token";
import userService from "./userService";
import tokenService from "./tokenService";
import certificationService from "./certificationService";
import { logger } from "../config/logger";
import { isInvalidEmail } from "../lib/util";

interface UserData {
    nickname: string;
    email: string;
    userID: string;
    password: string;
}

class AccountService {
    prisma = new PrismaClient();

    async register(userData: UserData) {
        const { nickname, email, userID, password } = userData;

        if (isInvalidEmail(email) === true) {
            throw new AppError("InvalidEmailFormatError");
        }

        const paswordHash = await bcrypt.hash(password, 10);

        await userService.create(nickname, email, userID, paswordHash);

        await this.prisma.$disconnect();

        return { ok: true };
    }

    async login(userID: string, password: string) {
        const isLogin = await this.prisma.token.findUnique({
            where: {
                userID,
            },
        });

        if (isLogin) {
            logger.error("LoginError");
            throw new AppError("LoginError");
        }

        const user = await this.prisma.account.findUnique({
            where: {
                userID: userID,
            },
        });

        if (user === null) {
            throw new AppError("LoginError");
        }

        const result = await bcrypt.compare(password, user.password);

        if (!result) {
            throw new AppError("UnknownError");
        }

        const accessToken = generateToken("access", userID);
        const refreshToken = await tokenService.addRefreshToken(userID);

        this.prisma.$disconnect();

        return {
            accessToken,
            refreshToken,
        };
    }

    async logout(userID: string) {
        try {
            const result = await tokenService.removeRefreshToken(userID);

            return result;
        } catch (e: any) {
            throw new AppError("LogOutError");
        }
    }

    async getUserByUserID(userID: string) {
        const user = this.prisma.account.findUnique({
            where: {
                userID,
            },
            select: {
                certified_account: true,
                User: {
                    select: {
                        nickname: true,
                    },
                },
            },
        });

        if (user === null) {
            return null;
        }

        return user;
    }

    async getUserByUserID_login(userID: string) {
        const user = this.prisma.account.findUnique({
            where: {
                userID,
            },
            select: {
                User: {
                    select: {
                        id: true,
                    },
                },
            },
        });

        if (user === null) {
            return null;
        }

        return user;
    }

    async getUserIDByCertification(email: string, code: string) {
        const result = await certificationService.certifyEmailByCode(email, code);

        if (result.ok !== true) {
            return null;
        }

        const user = await this.prisma.account.findUnique({
            where: {
                email,
            },
            select: {
                userID: true,
            },
        });

        if (user === null) {
            return null;
        }

        await this.prisma.$disconnect();

        return user.userID;
    }

    async changePassword(userID: string, password: string) {
        try {
            console.log(password);
            const paswordHash = await bcrypt.hash(password, 10);

            await this.prisma.account.update({
                where: {
                    userID,
                },
                data: {
                    password: paswordHash,
                },
            });

            await this.prisma.$disconnect();

            return { ok: true };
        } catch (e: any) {
            throw new AppError("UnknownError");
        }
    }

    async certify(userID: string, isCertified: boolean) {
        try {
            await this.prisma.account.update({
                where: {
                    userID,
                },
                data: { certified_account: isCertified },
            });

            await this.prisma.$disconnect();

            return { ok: true };
        } catch (e: any) {
            throw new AppError("UnknownError");
        }
    }
}

export default new AccountService();
