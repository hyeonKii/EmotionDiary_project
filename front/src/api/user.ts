import * as endpoint from "@/api/constants/userEndpoints";
import axios, { AxiosError, AxiosResponse } from "axios";
import { useMutation, UseMutationOptions } from "react-query";
import { URL } from "./url";

interface EditNickname {
    nickname: string | null | undefined;
}

async function deleteUser() {
    return await axios.post(URL + endpoint.USER_DELETE, null);
}

async function editNickname(userData: EditNickname) {
    return await axios.patch(URL + endpoint.USER_EDIT_NICKNAME, userData);
}

export const useRequestDeleteUser = (options?: UseMutationOptions<AxiosResponse, AxiosError>) =>
    useMutation(() => deleteUser(), options);

export const useRequestEditNickname = (
    userData: EditNickname,
    options?: UseMutationOptions<AxiosResponse, AxiosError>
) => useMutation(() => editNickname(userData), options);
