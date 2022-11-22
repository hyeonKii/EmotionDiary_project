import { useRequestWriteDiary } from "@/api/diary";
import useForm from "@/hooks/useForm";
import React from "react";
import { QueryClient } from "react-query";

function DiaryRegister() {
    const queryClient = new QueryClient();
    const { userID } = queryClient.getQueryData(["user"]);

    const { form, changeHandler } = useForm({ userID, title: "", description: "" });

    const { mutate: createDiary } = useRequestWriteDiary(form, {
        onSuccess: (data) => {
            console.log(data);
        },
        onError: (error) => {
            console.log(error.message);
        },
    });

    const registerDiary = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        createDiary();
    };

    return (
        <form onSubmit={registerDiary}>
            <label htmlFor="title">제목</label>
            <input type="text" id="title" onChange={changeHandler} />
            <label htmlFor="description">내용</label>
            <input type="textarea" id="description" onChange={changeHandler} />
            <button>등록</button>
        </form>
    );
}

export default DiaryRegister;
