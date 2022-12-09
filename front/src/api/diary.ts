import axios from "axios";
import { URL } from "./url";
import * as endpoint from "./constants/diaryEndpoints";
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

const writeDiary = (diaryData: WriteDiary) => {
    return axios.post(URL + endpoint.DIARY_WRITE, diaryData, {
        headers: {
            Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
            Refreshtoken: sessionStorage.getItem("refreshToken"),
        },
    });
};

export const getDiary = (count: number, page: number, emotion?: string) => {
    return axios.get(
        URL +
            endpoint.DIARY_GET +
            `?count=${count}&page=${page}&privatediary=${""}&emotion=${emotion}`,
        {
            headers: {
                Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
                Refreshtoken: sessionStorage.getItem("refreshToken"),
            },
        }
    );
};

const getMyDiary = (id: number) => {
    return axios.get(URL + endpoint.MYDIARY + "/" + id, {
        headers: {
            Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
            Refreshtoken: sessionStorage.getItem("refreshToken"),
        },
    });
};

const getMyAllDiaries = (count: number, page: number, emotion?: string) => {
    return axios.get(
        URL +
            endpoint.DIARY_GET +
            `?count=${count}&page=${page}&privatediary=${""}&emotion=${emotion}`,
        {
            headers: {
                Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
                Refreshtoken: sessionStorage.getItem("refreshToken"),
            },
        }
    );
};

const editMyDiary = (myDiaryData: EditDiary, id: number) => {
    return axios.put(URL + endpoint.MYDIARY + "/" + id, myDiaryData, {
        headers: {
            Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
            Refreshtoken: sessionStorage.getItem("refreshToken"),
        },
    });
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