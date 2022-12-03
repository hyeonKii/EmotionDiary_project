import axios from "axios";
import { URL } from "./url";
import * as endpoint from "./constants/certificationEndpoints";
import { useMutation } from "react-query";

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

export const useRequestSendCode = (userData: SendCode, options?) =>
    useMutation(() => sendCode(userData), options);

export const useRequestCheckCode = (userData: CheckCode, options?) =>
    useMutation(() => checkCode(userData), options);
