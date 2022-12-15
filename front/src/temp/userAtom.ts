import { atom } from "recoil";

interface UserType {
    nickname: string;
    id: number;
}

export const currentUser = atom<UserType | null>({
    key: "currentUser",
    default: null,
});
