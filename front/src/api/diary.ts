import axios from "axios";
import { URL } from "./url";
import * as endpoint from "./constants/diaryEndpoints";
import { useMutation, useQuery } from "react-query";

interface WriteDiary {
    title: string;
    description: string;
    privateDiary: boolean;
    createdAt: Date;
}

interface EditDiary {
    title: string;
    description: string;
    privateDiary: boolean;
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
        URL + endpoint.DIARY_GET + `?count=${count}&page=${page}&emotion=${emotion}&privatediary`,
        {
            headers: {
                Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
                Refreshtoken: sessionStorage.getItem("refreshToken"),
            },
        }
    );
};

const getMyDiary = (id: number | null) => {
    return axios.get(URL + endpoint.MYDIARY + "/" + id, {
        headers: {
            Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
            Refreshtoken: sessionStorage.getItem("refreshToken"),
        },
    });
};

const getMyAllDiaries = (count: number, page: number) => {
    return axios.get(URL + endpoint.DIARY_GET_MY_ALL + `?count=${count}&page=${page}`, {
        headers: {
            Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
            Refreshtoken: sessionStorage.getItem("refreshToken"),
        },
    });
};

const getMyMonthDiaries = (year: number, month: number | string) => {
    return axios.get(URL + endpoint.DIARY_MONTH + `?datetime=${year}-${month}-01`, {
        headers: {
            Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
            Refreshtoken: sessionStorage.getItem("refreshToken"),
        },
    });
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

export const useRequestWriteDiary = (diaryData: WriteDiary, options?: any) =>
    useMutation(() => writeDiary(diaryData), options);

export const useRequestGetDiary = (id: number | null, options?: any) =>
    useQuery(["diary", id], () => getMyDiary(id), options);

export const useRequestGetAllDiaries = (count: number, page: number, options?: any) =>
    useQuery(["diaries", page, count], () => getDiary(count, page), options);

export const useRequestGetMyAllDiaries = (count: number, page: number, options?: any) =>
    useQuery(["my-diaries", page, count], () => getMyAllDiaries(count, page), options);

export const useRequestGetMonthDiaries = (
    year: number,
    month: number | string,
    key: string,
    options?: any
) => useQuery([`${key}`, year, month], () => getMyMonthDiaries(year, month), options);

export const useRequestEditDiary = (diaryData: EditDiary, id: number, options?: any) =>
    useMutation(() => editMyDiary(diaryData, id), options);

export const useRequestDeleteDiary = (id: number, options?: any) =>
    useMutation(() => deleteMyDiary(id), options);
