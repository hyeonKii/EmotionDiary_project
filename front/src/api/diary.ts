import axios from "axios";
import { URL } from "./url";
import * as endpoint from "./constants/diaryEndpoints";
import { useMutation, useQuery } from "react-query";
import { useState } from "react";

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

const getDiary = (params: string) => {
    // const [page, setPage] = useState(0);
    // const [count, setCount] = useState(0);

    return axios.get(URL + endpoint.DIARY_GET + `?count=${count}&page=${page}}`, {
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

const getMyDiary = (id: string) => {
    return axios.get(URL + endpoint.MYDIARY + "/" + id, {
        headers: {
            Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
            Refreshtoken: sessionStorage.getItem("refreshToken"),
        },
    });
};

const editMyDiary = (myDiaryData: EditDiary, id: string) => {
    return axios.put(URL + endpoint.MYDIARY + "/" + id, myDiaryData, {
        headers: {
            Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
            Refreshtoken: sessionStorage.getItem("refreshToken"),
        },
    });
};

const deleteMyDiary = (id: string) => {
    return axios.delete(URL + endpoint.MYDIARY + "/" + id, {
        headers: {
            Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
            Refreshtoken: sessionStorage.getItem("refreshToken"),
        },
    });
};

export const useRequestWriteDiary = (diaryData, options?) =>
    useMutation(() => writeDiary(diaryData), options);

export const useRequestEditDiary = (diaryData, id, options?) =>
    useMutation(() => editMyDiary(diaryData, id), options);

export const useRequestDeleteDiary = (id, options?) =>
    useMutation(() => deleteMyDiary(id), options);

export const useRequestGetAllDiaries = (params, options?) =>
    useQuery(["diaries"], () => getDiary(params), options);

export const useRequestGetDiary = (key, id, options?) =>
    useQuery(key, () => getMyDiary(id), options);
