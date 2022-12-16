import { useRequestDeleteDiary, useRequestEditDiary } from "@/api/diary";
import useForm from "@/hooks/useForm";
import { SelectStyle } from "@/styles/diary/diary-style";
import { DiaryDetail, EditBlock, ReadBlock } from "@/styles/diary/todayDiary-style";
import { ChangeEvent, useEffect, useState } from "react";
import { useQueryClient } from "react-query";
import { PostInterface } from "./interface/post";

interface Props {
    post: PostInterface;
}

const getPostedDate = (createdAt: Date) => {
    const currentDate = new Date(createdAt);

    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth() + 1;
    const currentDay = currentDate.getDate();

    return `${currentYear}년 ${currentMonth}월 ${currentDay}일`;
};

export default function DiaryTodayPost({ post }: Props) {
    const { id, title, description, createdAt, private: privateDiary } = post;

    const queryClient = useQueryClient();

    const postedDate = getPostedDate(createdAt);

    const [isEdit, setIsEdit] = useState(false);
    const [privateMode, setPrivateMode] = useState(privateDiary);

    const { form, changeHandler } = useForm({
        title,
        description,
    });

    const { mutate: deleteDiary } = useRequestDeleteDiary(id, {
        onSuccess: async () => {
            await queryClient.invalidateQueries(["calendar-diaries"]);
            await queryClient.invalidateQueries(["past-diaries"]);
        },
        onError: () => {},
    });

    const { mutate: editDiary } = useRequestEditDiary({ ...form, privateDiary: privateMode }, id, {
        onSuccess: () => {
            queryClient.invalidateQueries(["diary", id]);
        },
        onError: () => {},
    });

    const editHandler = () => {
        editDiary();
        setIsEdit(false);
    };

    const selectHandler = (event: ChangeEvent<HTMLSelectElement>) => {
        const { value } = event.target;

        if (value === "나만보기") {
            setPrivateMode(true);
            return;
        }

        setPrivateMode(false);
    };

    return (
        <DiaryDetail isEdit={isEdit}>
            <article className="top">
                <span className="date">{postedDate}</span>
                <div className="icons">
                    {privateDiary ? (
                        <span className="material-symbols-outlined">lock</span>
                    ) : (
                        <span className="material-symbols-outlined">lock_open</span>
                    )}
                    <button className="material-symbols-outlined" onClick={() => setIsEdit(true)}>
                        edit
                    </button>
                    <button className="material-symbols-outlined" onClick={() => deleteDiary()}>
                        delete
                    </button>
                </div>
                {privateDiary ? (
                    <SelectStyle onChange={selectHandler}>
                        <option value="나만보기">&#128274; 나만보기</option>
                        <option value="전체공개">&#128275; 전체공개</option>
                    </SelectStyle>
                ) : (
                    <SelectStyle onChange={selectHandler}>
                        <option value="전체공개">&#128275; 전체공개</option>
                        <option value="나만보기">&#128274; 나만보기</option>
                    </SelectStyle>
                )}
            </article>
            {isEdit ? (
                <EditBlock>
                    <input
                        id="title"
                        className="title"
                        defaultValue={title}
                        onChange={changeHandler}
                    />
                    <textarea
                        id="description"
                        className="description"
                        defaultValue={description}
                        onChange={changeHandler}
                        rows={9}
                        autoFocus
                    />
                    <div>
                        <span className={description.length < 500 ? "countText" : "maxText"}>
                            {description.length}/500
                        </span>
                        <button
                            type="submit"
                            className="submitButton"
                            onClick={editHandler}
                            disabled={
                                description.length === 0 ||
                                description.length > 500 ||
                                title.length === 0
                            }
                        >
                            저장
                        </button>
                    </div>
                </EditBlock>
            ) : (
                <ReadBlock>
                    {<p className="title">{title}</p>}
                    {<p className="description">{description}</p>}
                </ReadBlock>
            )}
        </DiaryDetail>
    );
}
