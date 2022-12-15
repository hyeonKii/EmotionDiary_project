import { useRequestGetMyAllDiaries } from "@/api/diary";
import { none } from "@/assets/images";
import { Empty } from "@/styles/common/empty/empty-style";
import { ButtonStyle, SelectStyle } from "@/styles/diary/diary-style";
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
                    {diaryData?.data.postDatas.length > 0 ? (
                        <section>
                            {diaryData?.data.postDatas.map((post: PostInterface) => (
                                <DiaryPost key={post.id + "포스트"} post={post} />
                            ))}
                        </section>
                    ) : (
                        <Empty>
                            <img src={none} alt="none" />
                            <span>등록된 게시물이 없습니다.</span>
                        </Empty>
                    )}
                    {diaryCount ? (
                        <ButtonStyle>
                            <div>
                                <DiaryPageButton
                                    page={page}
                                    setPage={setPage}
                                    diaryCount={diaryCount}
                                    count={count}
                                />
                            </div>
                            <SelectStyle onChange={selectChangeHandler} defaultValue={count}>
                                <option value="5">5</option>
                                <option value="10">10</option>
                                <option value="15">15</option>
                                <option value="20">20</option>
                            </SelectStyle>
                        </ButtonStyle>
                    ) : null}
                </>
            )}
        </>
    );
}
