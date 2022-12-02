import { useRequestGetAllDiaries } from "@/api/diary";
import React, { useEffect, useState } from "react";
import AllDiariesPost from "../diary/AllDiariesPost";

interface Error {
    message: string;
}

interface Post {
    id: number;
    title: string;
    description: string;
    emotion: string;
    time: string;
    body: string;
    privateDiary: boolean;
}

export default function DiaryUserGetAll() {
    const [count, setCount] = useState(10);
    const [page, setPage] = useState(1);

    const { data: response, refetch } = useRequestGetAllDiaries(count, page, {
        onSuccess: () => {
            console.log("일기 전부 GET 요청 성공");
        },
        onError: (error: Error) => {
            console.log(error.message);
        },
    });

    const selectChangeHandler = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const value = Number(event.target.value);

        setCount(value);
    };

    return (
        <>
            {response && (
                <section>
                    {response.data.map((post: Post) => (
                        <AllDiariesPost key={post.id + "포스트"} post={post} refetch={refetch} />
                    ))}
                </section>
            )}
            <button
                onClick={() =>
                    setPage((prevState) => (prevState === 1 ? prevState : prevState - 1))
                }
            >
                이전 페이지
            </button>
            <button onClick={() => setPage((prevState) => prevState + 1)}>다음 페이지</button>
            <select onChange={selectChangeHandler} defaultValue={count}>
                <option value="5">5</option>
                <option value="10">10</option>
                <option value="15">15</option>
                <option value="20">20</option>
            </select>
        </>
    );
}
