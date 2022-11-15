import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const isInvalidEmail = (email) => {
    const reg = /^[\w-\.]+@([\w-]+\.)+com$/;

    if (!reg.test(email)) {
        return true;
    }

    return false;
};

class userService {
    static async addUser(userData) {
        if (isInvalidEmail(userData.email)) {
            const message = "올바른 형식의 이메일이 아닙니다.";
            return { result: false, message };
        }
        const email = userData.email;
        const isEmailOverlap = await prisma.user.findunique({ where: { email } });
        if (isEmailOverlap) {
            const message = "이미 존재하는 이메일입니다.";
            return { result: false, message };
        }
        const userid = userData.userid;
        const isIdOverlap = await prisma.user.findunique({ where: { userid } });
        if (isIdOverlap) {
            const message = "이미 존재하는 아이디입니다.";
            return { result: false, message };
        }
        const nickname = userData.nickname;
        const isNicknameOverlap = await prisma.User.findUnique({ where: { nickname } });
        if (isNicknameOverlap) {
            const message = "이미 존재하는 닉네임입니다.";
            return { result: false, message };
        }
        const password = userData.password;
        const hash = await bcrypt.hash(password, 10); // 자릿수?
        userData.password = hash;

        const joinedUser = await prisma.User.create({
            data: {
                id,
                email,
                nickname,
                password: hash,
            },
        });

        await prisma.$disconnect(); //??
        return joinedUser;
    }
}

export default userService;
