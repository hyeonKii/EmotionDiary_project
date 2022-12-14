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
    chatRoom: string;
}

export const recentlyMsgState = atom<ChatData>({
    key: "recentlyMsgState",
    default: { sender: "", msgText: "", chatRoom: "" },
});

export const currentroom = atom<string>({
    key: "currentroom",
    default: "",
});
export interface ChatForm {
    updatedAt: string | null;
    user_model_id: string | null;
    lastmessage: string | null;
    count: string | null;
}
export interface ChatListForm {
    [key: number]: ChatForm[];
}
export const chatListState = atom<ChatListForm[]>({
    key: "chatListState",
    default: [],
});
