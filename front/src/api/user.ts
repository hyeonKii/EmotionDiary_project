import axios from "axios";
import { URL } from "./url";
import * as endpoint from "./constants/userEndpoints";
import { useMutation } from "react-query";

interface Login {
    userID: string;
    password: string;
}

interface Register {
    userID: string;
    email: string;
    nickname: string;
    password: string;
}

interface FindID {
    email: string;
}

interface EmailCheck {
    emailVerification: boolean;
}

interface ChangePwd {
    userID: string;
    email: string;
    password: string;
    newpassword: string;
}

interface FindPwd {
    email: string;
}

interface ChangePwd {
    userID: string;
    nickname: string;
}

interface AuthPwd {
    userID: string;
    email: string;
}

interface Delete {
    userID: string;
}

interface Logout {
    userID: string;
}

async function loginUser(userData: Login) {
    return await axios.post(URL + endpoint.USER_LOGIN, userData);
}

async function registerUser(userData: Register) {
    return await axios.post(URL + endpoint.USER_REGISTER, userData);
}

async function findID(userData: FindID) {
    return await axios.post(URL + endpoint.USER_FIND_ID, userData);
}

async function emailCheck(userData: EmailCheck) {
    return await axios.post(URL + endpoint.USER_EMAIL_CHECK, userData);
}

async function changePwd(userData: ChangePwd) {
    return await axios.post(URL + endpoint.USER_CHANGE_PASSWORD, userData);
}

async function findPwd(userData: FindPwd) {
    return await axios.post(URL + endpoint.USER_FIND_PASSWORD, userData);
}

async function authPwd(userData: AuthPwd) {
    return await axios.post(URL + endpoint.USER_AUTH_PASSWORD, userData);
}

async function deleteUser(userData: Delete) {
    return await axios.post(URL + endpoint.USER_DELETE, userData);
}

async function logoutUser(userData: Logout) {
    return await axios.post(URL + endpoint.USER_LOGOUT, userData);
}

export const useRequestLogin = (userData: Login, options?: any) =>
    useMutation(() => loginUser(userData), options);

export const useRequestRegisterUser = (userData: Register, options?: any) =>
    useMutation(() => registerUser(userData), options);

export const useRequestFindID = (userData: FindID, options?: any) =>
    useMutation(() => findID(userData), options);

export const useRequestEmailCheck = (userData: EmailCheck, options?: any) =>
    useMutation(() => emailCheck(userData), options);

export const useRequestChangePwd = (userData: ChangePwd, options?: any) =>
    useMutation(() => changePwd(userData), options);

export const useRequestFindPwd = (userData: FindPwd, options?: any) =>
    useMutation(() => findPwd(userData), options);

export const useRequestAuthPwd = (userData: AuthPwd, options?: any) =>
    useMutation(() => authPwd(userData), options);

export const useRequestDeleteUser = (userData: Delete, options?: any) =>
    useMutation(() => deleteUser(userData), options);

export const useRequestLogout = (userData: Logout, options?: any) =>
    useMutation(() => logoutUser(userData), options);
