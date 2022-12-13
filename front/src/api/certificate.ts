import axios, { AxiosError, AxiosResponse } from "axios";
import { URL } from "./url";
import * as endpoint from "./constants/certificationEndpoints";
import { useMutation, UseMutationOptions } from "react-query";

interface SendCode {
    email: string;
}

interface CheckCode {
    email: string;
    target: string;
    code: string;
}

async function sendCode(userData: SendCode) {
    return await axios.post(URL + endpoint.CERTIFICATION_EMAIL_SEND_CODE, userData);
}

async function checkCode(userData: CheckCode) {
    return await axios.post(URL + endpoint.CERTIFICATION_EMAIL_CHECK_CODE, userData);
}

export const useRequestSendCode = (
    userData: SendCode,
    options?: UseMutationOptions<AxiosResponse, AxiosError>
) => useMutation(() => sendCode(userData), options);

export const useRequestCheckCode = (
    userData: CheckCode,
    options?: UseMutationOptions<AxiosResponse, AxiosError>
) => useMutation(() => checkCode(userData), options);
