import { atom } from "recoil";

interface UserType {
    nickname: string;
}

export const currentUser = atom<UserType | null>({
    key: "currentUser",
    default: null,
});
