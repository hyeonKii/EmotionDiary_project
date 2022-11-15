import { PrismaClient, User } from "@prisma/client";
import bcrypt from "bcrypt";
import AppError from "lib/AppError";

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
    async addUser(userData: UserData) {
        if (isInvalidEmail(userData.email)) {
            throw new AppError("InvalidEmailFormatError");
        }
        const userID = userData.userID;
        const email = userData.email;
        const nickname = userData.nickname;
        const isEmailOverlap = await this.prisma.user.findUnique({ where: { email } });
        const isIdOverlap = await this.prisma.user.findUnique({ where: { userID } });
        const isNicknameOverlap = await this.prisma.user.findUnique({ where: { nickname } });
        if (isEmailOverlap) {
            throw new AppError("UserExistError");
        }
        if (isIdOverlap) {
            throw new AppError("UserExistError");
        }
        if (isNicknameOverlap) {
            throw new AppError("UserExistError");
        }
        const password = userData.password;
        const hash = await bcrypt.hash(password, 10); // 자릿수?
        userData.password = hash;

        const joinedUser = await this.prisma.user.create({
            data: {
                nickname: userData.nickname,
                userID: userData.userID,
                email: userData.email,
                password: hash,
            },
        });

        await this.prisma.$disconnect(); //??
        return joinedUser;
    }

    // async loginUser({ userID: String, password }) {
    //     const userData = await prisma.User.findUnique({
    //         where: {
    //             userID,
    //         },
    //     });
    //     if (userData === null) {
    //         const message = "아이디 또는 비밀번호를 확인해주세요.";
    //         return { result: false, message };
    //     }
    //     const result = await bcrypt.compare(password, userData.password);
    //     if (!result) {
    //         const message = "아이디 또는 비밀번호를 확인해주세요.";
    //         return { result: false, message };
    //     }
    //     const accessToken = generateToken({ userID: userData.userID }, "accessToken");
    //     let refreshToken = generateToken({}, "refreshToken");

    //     await prisma.User.update({ where: { userID }, data: { token: refreshToken } });
    //     if (userData.role === "ADMIN") {
    //         return { userID, accessToken, refreshToken, admin: true };
    //     }
    //     await prisma.$disconnect();
    //     return { userID, accessToken, refreshToken, admin: false };
    // }

    // static async logoutUser(token) {
    //     const value = Token.removeToken(token);
    //     return value;
    // }
}

export default userService as any;
