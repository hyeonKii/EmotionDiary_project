import { LOGIN } from "@/components/user/constants/tabList";
import { atom, useRecoilValue } from "recoil";
import { currentUser } from "./userAtom";

type FORM_TYPE = 1 | 2 | 3 | 4;

export const currentForm = atom<FORM_TYPE>({
    key: "currentForm",
    default: LOGIN,
});

export const showLoginForm = atom<boolean>({
    key: "loginForm",
    default: false,
});
