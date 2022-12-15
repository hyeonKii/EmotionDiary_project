import { atom } from "recoil";

interface UserType {
    nickname: string;
}
interface UseridType {
    nickname: string;
    id: number;
}

export const currentUser = atom<UserType | null>({
    key: "currentUser",
    default: null,
});
export const currentidUser = atom<UseridType | null>({
    key: "currentUser",
    default: null,
});
