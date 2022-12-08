import { PrismaClient, Prisma } from "@prisma/client";
import AppError from "../lib/AppError";

class ChatService {
    private prisma = new PrismaClient();

    async saveChat(inviter: string, invitee: string) {
        const result = await this.prisma.chat.findUnique({
            where: {
                user_model_id: inviter + invitee,
            },
        });
        console.log(typeof inviter, typeof invitee);
        if (result !== null) {
            //이미 방이 있으므로 아무 것도 하지 않음
            console.log("이미 존재함", inviter, invitee);
            return;
        } else {
            try {
                await this.prisma.chat.create({
                    data: {
                        user_model_id: inviter + invitee,
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
        const result = await this.prisma.chat.findMany({
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
                // updatedAt: true,
            },
        });
        console.log(result, "roomlist");
        await this.prisma.$disconnect();
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
                    receiver: userid,
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
        console.log(4234243, typeof roomName);
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
        console.log(result, 4234243);
        await this.prisma.$disconnect();
        return { result };
    }
}

export default new ChatService();
