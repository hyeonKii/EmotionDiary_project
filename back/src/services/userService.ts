import { PrismaClient } from "@prisma/client";
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
