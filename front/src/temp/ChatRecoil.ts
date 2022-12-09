import { atom } from "recoil";
export interface MessageModel {
    id: string | null;
    chatRoom: string | null;
    createdAt: string | null;
    updatedAt: string | null;
    sender: string | null;
    receiver: string | null;
    msgText: string | null;
}
export const chatMessgeList = atom<MessageModel | null>({
    key: "ChallengeBoardWriter",
    default: null,
});

export interface recentlyMessageModel {
    result: [sender: string, msgText: string] | any;
}
export interface ChatData {
    sender: string;
    msgText: string;
}

export const recentlyMsgState = atom<ChatData>({
    key: "recentlyMsgState",
    default: { sender: "", msgText: "" },
});
