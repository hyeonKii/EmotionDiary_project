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
        const result = await this.prisma.chat.findUnique({
            where: {
                user_model_id: inviter + invitee,
            },
        });
        if (result !== null) {
            //이미 방이 있으므로 아무 것도 하지 않음
            console.log("이미 존재함", inviter, invitee);
            return;
        } else {
            try {
                await this.prisma.chat.create({
                    data: {
                        user_model_id: inviter + "," + invitee,
                        inviter: inviter,
                        invitee: invitee,
                        lastmessage: "",
                    },
                });
            } catch (e: any) {
                if (e instanceof Prisma.PrismaClientKnownRequestError) {
                    console.log(e.message);
                    throw new AppError("ArgumentError");
                }
            }
        }
        await this.prisma.$disconnect();
        return { result: true };
    }

    async roomList(usermodel: number) {
        console.log(usermodel, "usermodel");
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
            },
        });
        await this.prisma.$disconnect();

        const result = result1.map((item) => ({
            ...item,
            updatedAt: this.dateTime(item.updatedAt),
        }));
        // const result = result1.map((item) => ({ ...item, updatedAt: item.updatedAt.toString() }));
        return { result };
    }

    // async LastMessage(usermodel: number) {
    //     console.log(usermodel, "usermodel");
    //     const result = await this.prisma.chat.findMany({
    //         where: {
    //             OR: [
    //                 {
    //                     inviter: String(usermodel),
    //                 },
    //                 {
    //                     invitee: String(usermodel),
    //                 },
    //             ],
    //         },

    //         select: {
    //             // user_model_id: true,
    //             lastmessage: true,
    //         },
    //     });
    //     console.log(result, "roomlist");
    //     await this.prisma.$disconnect();
    //     return { result };
    // }

    async saveMessege(roomName: string, message: string, userid: string) {
        const members = roomName.split(",");
        let receiveris = members.filter((x) => {
            return x != userid;
        });

        const result = await this.prisma.chat.update({
            where: {
                user_model_id: roomName,
            },
            data: {
                lastmessage: message,
            },
        });

        try {
            await this.prisma.messege.create({
                data: {
                    chatRoom: roomName,
                    sender: userid,
                    receiver: receiveris.join(),
                    msgText: message,
                },
            });
        } catch (e: any) {
            if (e instanceof Prisma.PrismaClientKnownRequestError) {
                console.log(e.message);
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
                sender: userid,
            },
        });

        await this.prisma.$disconnect();
        return { result };
    }

    async readMessage(roomName: string, userid: string) {
        const result = await this.prisma.messege.updateMany({
            where: {
                chatRoom: roomName,
                sender: userid,
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
