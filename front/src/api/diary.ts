import axios from "axios";
import { URL } from "./url";
import * as endpoint from "./constants/diaryEndpoints";
import { useQuery, useMutation } from "react-query";

interface Write {
    userID: string;
    title: string;
    description: string;
}

interface AddView {
    id: string;
}

interface FetchAll {
    count: number;
    page: number;
}

interface Fetch {
    id: string;
}

interface Edit {
    id: string;
    title: string;
    description: string;
}

interface Delete {
    id: string;
}

async function writeDiary(diaryData: Write) {
    return await axios.post(URL + endpoint.DIARY_REGISTER, diaryData);
}

async function addView(diaryData: AddView) {
    return await axios.post(URL + endpoint.DIARY_ADD_VIEW, diaryData);
}

async function fetchAllDiary(diaryData: FetchAll) {
    return await axios.post(URL + endpoint.DIARY_FETCH_ALL, diaryData);
}

async function fetchDiary(diaryData: Fetch) {
    return await axios.post(URL + endpoint.DIARY_FETCH, diaryData);
}

async function editDiary(diaryData: Edit) {
    return await axios.post(URL + endpoint.DIARY_EDIT, diaryData);
}

async function deleteDiary(diaryData: Delete) {
    return await axios.post(URL + endpoint.DIARY_DELETE, diaryData);
}

export const useRequestWriteDiary = (diaryData: Write, options?: any) =>
    useMutation(() => writeDiary(diaryData), options);

export const useRequestAddView = (diaryData: AddView, options?: any) =>
    useMutation(() => addView(diaryData), options);

export const useFetchAllDiaries = (diaryData: FetchAll, options?: any) =>
    useQuery(["diaries"], () => fetchAllDiary(diaryData), options);

export const useFetchDiary = (diaryData: Fetch, options?: any) =>
    useQuery(["diary"], () => fetchDiary(diaryData), options);

export const useRequestEditDiary = (diaryData: Edit, options?: any) =>
    useMutation(() => editDiary(diaryData), options);

export const useRequestDeleteDiary = (diaryData: Delete, options?: any) =>
    useMutation(() => deleteDiary(diaryData), options);
