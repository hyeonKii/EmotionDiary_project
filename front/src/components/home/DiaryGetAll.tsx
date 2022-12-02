import { useRequestGetAllDiaries } from "@/api/diary";
import { useEffect, useState } from "react";
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
    const [count, setCount] = useState(10);
    const [page, setPage] = useState(1);

    const { data: response, refetch } = useRequestGetAllDiaries(10, page, {
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
        console.log(page);
    }, [page]);

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
        </>
    );
}
