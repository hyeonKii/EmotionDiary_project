import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import AppError from "lib/AppError";
import generator from "generate-password";

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

    async login(userData: UserData) {
        //Db에서 찾은 유저 정보 - userDbData
        const userDbData = await this.prisma.user.findUnique({
            where: {
                userID: userData.userID,
            },
        });
        if (userDbData === null) {
            throw new AppError("UserNotFindError");
        }
        const result = await bcrypt.compare(userData.password, userDbData.password);
        if (!result) {
            throw new AppError("UserNotFindError");
        }

        await this.prisma.$disconnect();
        return { userID: userData.userID, nickname: userData.nickname, email: userData.email };
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

    async authId(userID: string, email: string) {
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
