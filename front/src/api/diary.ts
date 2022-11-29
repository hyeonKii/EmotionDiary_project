import axios from "axios";
import { URL } from "./url";
import * as endpoint from "./constants/diaryEndpoints";

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

export const writeDiary = (diaryData: WriteDiary) => {
    return axios.post(URL + endpoint.DIARY_WRITE, diaryData);
};

export const getDiary = (params: string) => {
    return axios.get(URL + endpoint.DIARY_GET + params);
};

export const getEmotionDiary = (params: string) => {
    return axios.get(URL + endpoint.DIARY_GET + params);
};

export const getMyDiary = (id: string) => {
    return axios.get(URL + endpoint.MYDIARY + "/" + id);
};

export const editMyDiary = (myDiaryData: EditDiary, id: string) => {
    return axios.put(URL + endpoint.MYDIARY + "/" + id, myDiaryData);
};

export const deleteMyDiary = (id: string) => {
    return axios.delete(URL + endpoint.MYDIARY + "/" + id);
};
