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
    result: [user_model_id: string, lastmessage: string] | any;
}

export const recentlyMsgState = atom<recentlyMessageModel | null>({
    key: "recentlyMsgState",
    default: null,
});
