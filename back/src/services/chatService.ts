import { PrismaClient, Prisma } from "@prisma/client";
import AppError from "../lib/AppError";
class ChatService {
    private prisma = new PrismaClient();

    dateTime = (date: Date) => {
        const milliSeconds = Number(new Date()) - Number(date);
        const seconds = milliSeconds / 1000;
        if (seconds < 60) return `방금 전`;
        const minutes = seconds / 60;
        if (minutes < 60) return `${Math.floor(minutes)}분 전`;
        const hours = minutes / 60;
        if (hours < 24) return `${Math.floor(hours)}시간 전`;
        const dateString = date.toLocaleDateString();
        return dateString;
    };

    async saveChat(inviter: string, invitee: string) {
        let roomName;
        if (Number(inviter) > Number(invitee)) {
            roomName = inviter + "," + invitee;
        } else {
            roomName = invitee + "," + inviter;
        }

        const result = await this.prisma.chat.findUnique({
            where: {
                user_model_id: roomName,
            },
        });
        if (result !== null) {
            //이미 방이 있으므로 아무 것도 하지 않음
            return;
        } else {
            try {
                await this.prisma.chat.create({
                    data: {
                        user_model_id: roomName,
                        inviter: inviter,
                        invitee: invitee,
                        lastmessage: "",
                    },
                });
            } catch (e: any) {
                if (e instanceof Prisma.PrismaClientKnownRequestError) {
                    throw new AppError("ArgumentError");
                }
            }
        }
        await this.prisma.$disconnect();
        return { result: true };
    }
    async roomList(usermodel: number) {
        const result1 = await this.prisma.chat.findMany({
            where: {
                OR: [
                    {
                        inviter: String(usermodel),
                    },
                    {
                        invitee: String(usermodel),
                    },
                ],
            },
            select: {
                user_model_id: true,
                lastmessage: true,
                updatedAt: true,
                //count: 안읽은 메세지 추가 해야함
            },
        });

        await this.prisma.$disconnect();

        const result = result1.map((item) => ({
            ...item,
            updatedAt: this.dateTime(item.updatedAt),
        }));
        return { result };
    }

    async saveMessege(chatRoom: string, message: string, userid: string) {
        if (chatRoom === null) {
            return;
        }
        const members = chatRoom.split(",");
        let result;
        let receiveris = members.filter((x) => {
            return x != userid;
        });
        const find = await this.prisma.chat.findUnique({
            where: {
                user_model_id: chatRoom,
            },
        });
        if (find != null) {
            result = await this.prisma.chat.update({
                where: {
                    user_model_id: chatRoom,
                },
                data: {
                    lastmessage: message,
                },
            });
        }
        try {
            await this.prisma.messege.create({
                data: {
                    chatRoom: chatRoom,
                    sender: userid,
                    receiver: receiveris.join(),
                    msgText: message,
                },
            });
        } catch (e: any) {
            if (e instanceof Prisma.PrismaClientKnownRequestError) {
                throw new AppError("ArgumentError");
            }
        }
        await this.prisma.$disconnect();
        return { result: result };
    }

    async getMessege(roomName: string) {
        const result = await this.prisma.messege.findMany({
            where: {
                chatRoom: roomName,
            },
            select: {
                msgText: true,
                sender: true,
                chatRoom: true,
            },
        });
        await this.prisma.$disconnect();
        return { result };
    }

    async getLastMessege(roomName: string) {
        const result = await this.prisma.messege.findMany({
            where: {
                chatRoom: roomName,
            },
            select: {
                msgText: true,
                sender: true,
            },
            orderBy: [{ id: "desc" }],
        });
        await this.prisma.$disconnect();
        return { result };
    }

    async countMessegeNotRead(roomName: string, userid: string) {
        let result = await this.prisma.messege.count({
            where: {
                chatRoom: roomName,
                read: false,
                receiver: userid,
            },
        });
        await this.prisma.$disconnect();
        return { result };
    }

    async readMessage(roomName: string, userid: string) {
        const result = await this.prisma.messege.updateMany({
            where: {
                chatRoom: roomName,
                receiver: userid,
                read: false,
            },
            data: {
                read: true,
            },
        });

        await this.prisma.$disconnect();
        return { result };
    }
}

export default new ChatService();
