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

export default function DiaryGetAll() {
    const [count, setCount] = useState("10");
    const [page, setPage] = useState(1);

    const { data: response, refetch } = useRequestGetAllDiaries(count, page, {
        onSuccess: () => {
            console.log("일기 전부 GET 요청 성공");
        },
        onError: (error: Error) => {
            console.log(error.message);
        },
    });

    const buttonHandler = () => {
        refetch();
    };

    useEffect(() => {
        console.log(page, count);
    }, [page, count]);

    return (
        <>
            <button onClick={buttonHandler}>데이터 체크</button>
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
            <select
                onChange={(event: React.ChangeEvent<HTMLSelectElement>) =>
                    setCount(event.target.value)
                }
            >
                <option value="5">5</option>
                <option value="10" selected>
                    10
                </option>
                <option value="15">15</option>
                <option value="20">20</option>
            </select>
        </>
    );
}
