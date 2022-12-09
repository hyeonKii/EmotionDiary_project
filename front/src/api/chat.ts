import axios from "axios";
import { URL } from "./url";
import * as endpoint from "./constants/chatEndpoints";
import { useMutation, useQuery } from "react-query";

interface WriteDiary {
    userID: string;
    title: string;
    description: string;
}

interface EditDiary {
    id: string;
    title: string;
    description: string;
}

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

const deleteMyDiary = (id: number) => {
    return axios.delete(URL + endpoint.MYDIARY + "/" + id, {
        headers: {
            Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
            Refreshtoken: sessionStorage.getItem("refreshToken"),
        },
    });
};

const getEmotionDiary = (params: string) => {
    return axios.get(URL + endpoint.DIARY_GET + params, {
        headers: {
            Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
            Refreshtoken: sessionStorage.getItem("refreshToken"),
        },
    });
};

export const useRequestWriteDiary = (diaryData, options?) =>
    useMutation(() => writeDiary(diaryData), options);

export const useRequestGetDiary = (key: string[], id: number, options?) =>
    useQuery(key, () => getMyDiary(id), options);

export const useRequestGetAllDiaries = (count: number, page: number, options?) =>
    useQuery(["diaries", page, count], () => getDiary(count, page), options);

export const useRequestGetMyAllDiaries = (count: number, page: number, options?) =>
    useQuery(["diaries", page, count], () => getMyAllDiaries(count, page), options);

export const useRequestEditDiary = (diaryData, id: number, options?) =>
    useMutation(() => editMyDiary(diaryData, id), options);

export const useRequestDeleteDiary = (id: number, options?) =>
    useMutation(() => deleteMyDiary(id), options);
