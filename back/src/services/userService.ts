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

    async login(userID: string, password: string) {
        //Db에서 찾은 유저 정보 - userDbData
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
            throw new AppError("WrongPasswordError");
        }

        // Todo: add to authorization

        await this.prisma.$disconnect();
        return {
            userID: userDbData.userID,
            nickname: userDbData.nickname,
            email: userDbData.email,
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

    async changePassword(userID: string, email: string, password: string, newpassword: string) {
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

    async findPassword(userID: string, email: string) {
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

    async authPassword(userID: string, password: string) {
        console.log(userID, password);
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
            throw new AppError("WrongPasswordError");
        }
        await this.prisma.$disconnect();
        return { result: true };
    }
}

export default new userService();
