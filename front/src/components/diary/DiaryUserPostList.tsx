import { useRequestGetMyAllDiaries } from "@/api/diary";
import React, { useState } from "react";
import styled from "styled-components";
import DiaryPageButton from "./DiaryPageButton";
import DiaryPost from "./DiaryPost";
import { PostInterface } from "./interface/post";

interface Error {
    message: string;
}
interface Response {
    data: { diarycount: number; postDatas: PostInterface };
}

const POST_COUNT = 5;
const INITIAL_PAGE = 1;

export default function DiaryUserPostList() {
    const [count, setCount] = useState(POST_COUNT);
    const [page, setPage] = useState(INITIAL_PAGE);
    const [diaryCount, setDiaryCount] = useState(0);

    const { isLoading, data: diaryData } = useRequestGetMyAllDiaries(count, page, {
        onSuccess: (res: Response) => {
            console.log("일기 전부 GET 요청 성공");
            setDiaryCount(res.data.diarycount);
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
            {!isLoading && (
                <>
                    {diaryData && (
                        <section>
                            {diaryData.data.postDatas.map((post: PostInterface) => (
                                <DiaryPost key={post.id + "포스트"} post={post} />
                            ))}
                        </section>
                    )}
                    <PageButtonStyle>
                        <div>
                            <DiaryPageButton
                                page={page}
                                setPage={setPage}
                                diaryCount={diaryCount}
                                count={count}
                            />
                        </div>
                        <select onChange={selectChangeHandler} defaultValue={count}>
                            <option value="5">5</option>
                            <option value="10">10</option>
                            <option value="15">15</option>
                            <option value="20">20</option>
                        </select>
                    </PageButtonStyle>
                </>
            )}
        </>
    );
}

const PageButtonStyle = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;

    margin-top: 5rem;

    div {
        display: flex;
        flex-direction: row;

        button {
            font-size: 1rem;
            margin-right: 1rem;
        }
    }
`;
