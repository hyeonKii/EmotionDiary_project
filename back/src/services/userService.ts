import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import AppError from "lib/AppError";
import generator from "generate-password";
import mailSender from "config/mail";
import { generateToken } from "lib/token";
import tokenService from "./tokenService";

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
}

class UserService {
    prisma = new PrismaClient();

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

        tokenService.addToken(userID, refreshToken);

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
        const userData = await this.prisma.user.findUnique({
            where: {
                email: email,
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
        return userData;
    }

    async findPassword(userID: string, email: string) {
        if (isInvalidEmail(email)) {
            throw new AppError("InvalidEmailFormatError");
        }

        const userData = await this.prisma.user.findUnique({
            where: { userID },
            select: { password: true },
        });

        if (userData === null) {
            throw new AppError("UserNotFindError");
        }
        mailSender(email);

        const pw = generator.generate({ length: 8, numbers: true });

        const hashPw = await bcrypt.hash(pw, 10);

        await this.prisma.user.update({
            where: { userID },
            data: { password: hashPw },
        });

        await this.prisma.$disconnect();

        return { result: true, password: pw };
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
}

export default new UserService();
