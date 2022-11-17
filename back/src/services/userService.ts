import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import AppError from "lib/AppError";
import generator from "generate-password";
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

class userService {
    prisma = new PrismaClient();

    async register(userData: UserData) {
        if (isInvalidEmail(userData.email)) {
            console.log(isInvalidEmail(userData.email), userData);
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

        await this.prisma.$disconnect(); //??
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

        const userDbData = await this.prisma.user.findUnique({
            where: {
                userID: userID,
            },
        });

        if (userDbData === null) {
            throw new AppError("UserNotFindError");
        }

        const result = await bcrypt.compare(password, userDbData.password);

        if (!result) {
            throw new AppError("UserNotFindError");
        }

        const accessToken = generateToken("access", userID);
        const refreshToken = generateToken("refresh", "");

        tokenService.addToken(userID, refreshToken);

        this.prisma.$disconnect();

        return {
            userID: userDbData.userID,
            nickname: userDbData.nickname,
            email: userDbData.email,
            accessToken,
            refreshToken,
        };
    }

    async findId(email: string) {
        if (isInvalidEmail(email)) {
            throw new AppError("InvalidEmailFormatError");
        }
        const userDbData = await this.prisma.user.findUnique({
            where: {
                email: email,
            },
            select: {
                userID: true,
            },
        });
        await this.prisma.$disconnect();
        return userDbData;
    }

    async changePw(userID: string, email: string, password: string, newpassword: string) {
        const userDbData = await this.prisma.user.findUnique({
            where: {
                userID: userID,
            },
        });
        console.log(userID, userDbData);
        if (userDbData === null) {
            throw new AppError("UserNotFindError");
        }

        if (isInvalidEmail(email)) {
            throw new AppError("InvalidEmailFormatError");
        }

        const result = await bcrypt.compare(password, userDbData.password);
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
        return userDbData;
    }

    async findPW(userID: string, email: string) {
        if (isInvalidEmail(email)) {
            throw new AppError("InvalidEmailFormatError");
        }
        const userData = await this.prisma.user.findMany({
            where: { AND: [{ userID }, { email }] },
            select: { password: true },
        });

        if (userData.length === 0) {
            throw new AppError("UserNotFindError");
        }
        const pw = generator.generate({ length: 8, numbers: true });

        const hashPw = await bcrypt.hash(pw, 10);

        await this.prisma.user.update({
            where: { userID },
            data: { password: hashPw },
        });
        await this.prisma.$disconnect();
        return { result: true, password: pw };
    }
}

export default new userService();
