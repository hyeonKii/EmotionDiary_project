import * as endpoint from "@/api/constants/userEndpoints";
import axios from "axios";
import { useMutation } from "react-query";
import { URL } from "./url";

interface Delete {
    userID: string;
}

interface EditNickname {
    nickname: string | null | undefined;
}

async function deleteUser() {
    return await axios.post(URL + endpoint.USER_DELETE, null, {
        headers: {
            Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
            Refreshtoken: sessionStorage.getItem("refreshToken"),
        },
    });
}

async function editNickname(userData: EditNickname) {
    return await axios.patch(URL + endpoint.USER_EDIT_NICKNAME, userData, {
        headers: {
            Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
            Refreshtoken: sessionStorage.getItem("refreshToken"),
        },
    });
}

export const useRequestDeleteUser = (options?: any) => useMutation(() => deleteUser(), options);

export const useRequestEditNickname = (userData: EditNickname, options?: any) =>
    useMutation(() => editNickname(userData), options);
