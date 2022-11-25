import * as endpoint from "@/api/constants/userEndpoints";
import axios from "axios";
import { useMutation } from "react-query";
import { URL } from "./url";

interface Delete {
    userID: string;
}

interface EditNickname {
    nickname: string;
}

async function deleteUser(userData: Delete) {
    return await axios.post(URL + endpoint.USER_DELETE, userData, {
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

export const useRequestDeleteUser = (userData: Delete, options?: any) =>
    useMutation(() => deleteUser(userData), options);

export const useRequestEditNickname = (userData: EditNickname, options?: any) =>
    useMutation(() => editNickname(userData), options);
