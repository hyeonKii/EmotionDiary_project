import * as endpoint from "@/api/constants/userEndpoints";
import axios, { AxiosError, AxiosResponse } from "axios";
import { useMutation, UseMutationOptions } from "react-query";
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

export const useRequestDeleteUser = (options?: UseMutationOptions<AxiosResponse, AxiosError>) =>
    useMutation(() => deleteUser(), options);

export const useRequestEditNickname = (
    userData: EditNickname,
    options?: UseMutationOptions<AxiosResponse, AxiosError>
) => useMutation(() => editNickname(userData), options);
