import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import AppError from "lib/AppError";
import generator from "generate-password";
import mailSender from "lib/mail";
import { generateToken } from "lib/token";
import tokenService from "./tokenService";
import * as nodeMailer from "nodemailer";
import { logger } from "../config/logger";

const isInvalidEmail = (email: string) => {
    const reg = /^[\w-\.]+@([\w-]+\.)+com$/;
    if (!reg.test(email)) {
        return true;
    }
    return false;
};

interface UserData {
    nickname: string;
    email: string;
    userID: string;
    password: string;
    emailVerification: string;
}

// register, login, logout, findID, emailVerification, changePassword, changeNickname, findPassword, authPassword, withdrawal
class UserService {
    private prisma = new PrismaClient();

    async register(userData: UserData) {
        if (isInvalidEmail(userData.email)) {
            throw new AppError("InvalidEmailFormatError");
        }
        const paswordHash = await bcrypt.hash(userData.password, 10);
        const joinedUser = await this.prisma.user.create({
            data: {
                nickname: userData.nickname,
                userID: userData.userID,
                email: userData.email,
                password: paswordHash,
            },
        });

        await this.prisma.$disconnect();
        return joinedUser;
    }

    async login(userID: string, password: string) {
        const isLogin = await this.prisma.token.findUnique({
            where: {
                userID,
            },
        });

        if (isLogin) {
            logger.error("LoginFailError");
            throw new AppError("LoginFailError");
        }

        const userData = await this.prisma.user.findUnique({
            where: {
                userID: userID,
            },
        });

        if (userData === null) {
            throw new AppError("UserNotFindError");
        }

        const result = await bcrypt.compare(password, userData.password);

        if (!result) {
            throw new AppError("UserNotFindError");
        }

        const accessToken = generateToken("access", userID);
        const refreshToken = generateToken("refresh", "");

        tokenService.addRefreshToken(userID);

        this.prisma.$disconnect();

        return {
            nickname: userData.nickname,
            accessToken,
            refreshToken,
        };
    }

    async findID(email: string) {
        if (isInvalidEmail(email)) {
            throw new AppError("InvalidEmailFormatError");
        }
        const emailpw = generator.generate({ length: 8, numbers: true });
        await this.prisma.user.update({
            where: {
                email,
            },
            data: {
                emailVerification: emailpw,
            },
        });
        const userData = await this.prisma.user.findMany({
            where: {
                emailVerification: emailpw,
            },
            select: {
                userID: true,
            },
        });

        if (userData.length != 1) {
            return this.findID;
        }

        mailSender(email, emailpw, "이메일로 인증번호를 전송 했습니다");
        await this.prisma.$disconnect();
        return { return: true };
    }

    async emailVerification(emailVerification: string) {
        const userData = await this.prisma.user.findMany({
            where: {
                emailVerification: emailVerification,
            },
            select: {
                userID: true,
            },
        });

        await this.prisma.$disconnect();
        return userData;
    }

    async changePassword(userID: string, email: string, password: string, newpassword: string) {
        if (isInvalidEmail(email)) {
            throw new AppError("InvalidEmailFormatError");
        }

        const userData = await this.prisma.user.findUnique({
            where: {
                userID: userID,
            },
        });

        if (userData === null) {
            throw new AppError("UserNotFindError");
        }

        const result = await bcrypt.compare(password, userData.password);
        if (!result) {
            throw new AppError("WrongPasswordError");
        }
        const paswordHash = await bcrypt.hash(newpassword, 10);
        await this.prisma.user.update({
            where: {
                userID,
            },
            data: {
                password: paswordHash,
            },
        });
        await this.prisma.$disconnect();
        return { return: true };
    }

    async changeNickname(userID: string, nickname: string) {
        await this.prisma.user.update({
            where: {
                userID,
            },
            data: {
                nickname: nickname,
            },
        });
        await this.prisma.$disconnect();
        return { return: true };
    }

    async findPassword(email: string) {
        if (isInvalidEmail(email)) {
            throw new AppError("InvalidEmailFormatError");
        }

        const userData = await this.prisma.user.findUnique({
            where: { email },
        });

        if (userData === null) {
            throw new AppError("UserNotFindError");
        }
        const pw = generator.generate({ length: 8, numbers: true });
        const hashPw = await bcrypt.hash(pw, 10);

        await this.prisma.user.update({
            where: { email },
            data: { password: hashPw },
        });
        mailSender(email, pw, "이메일로 임시 비밀번호를 전송 했습니다");
        await this.prisma.$disconnect();

        return { result: true };
    }

    async authPassword(userID: string, password: string) {
        const userData = await this.prisma.user.findUnique({
            where: {
                userID: userID,
            },
        });

        if (userData === null) {
            throw new AppError("UserNotFindError");
        }

        const result = await bcrypt.compare(password, userData.password);

        if (!result) {
            throw new AppError("WrongPasswordError");
        }

        await this.prisma.$disconnect();
        return { result: true };
    }

    async withdrawal(userID: string) {
        await this.prisma.user.update({
            where: { userID },
            data: { withdrawal: true },
        });
        await this.prisma.$disconnect();
        return "success";
    }

    async logoutUser(userID: string) {
        // const value = tokenService.removeToken(userID);
        // return value;
        return true;
    }
}

export default new UserService();
