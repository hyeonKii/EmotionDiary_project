import axios from "axios";
import { URL } from "./url";
import * as endpoint from "./constants/chatEndpoints";

export const getMessege = (roomName: string | undefined) => {
    return axios.get(URL + endpoint.MESSEGE_GET + `?roomname=${roomName}`, {
        headers: {
            Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
            Refreshtoken: sessionStorage.getItem("refreshToken"),
        },
    });
};

export const getCountMessege = (roomName: string, userid: string | undefined) => {
    return axios.get(URL + endpoint.MESSEGE_COUNT + `?roomname=${roomName}&userid=${userid}`, {
        headers: {
            Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
            Refreshtoken: sessionStorage.getItem("refreshToken"),
        },
    });
};
export const readMessege = (roomName: string, userid: string | undefined) => {
    return axios.put(
        URL + endpoint.MESSEGE_READ_UPDATE + `?roomname=${roomName}&userid=${userid}`,
        {
            headers: {
                Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
                Refreshtoken: sessionStorage.getItem("refreshToken"),
            },
        }
    );
};
