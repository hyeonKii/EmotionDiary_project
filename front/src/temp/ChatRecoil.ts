import { atom } from "recoil";
export interface ChallengeBoardModel {
    id: string | null;
    chatRoom: string | null;
    createdAt: string | null;
    updatedAt: string | null;
    sender: string | null;
    receiver: string | null;
    msgText: string | null;
}
export const chatMessgeList = atom<ChallengeBoardModel | null>({
    key: "ChallengeBoardWriter",
    default: null,
});
