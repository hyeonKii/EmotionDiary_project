import { useRequestDeleteDiary, useRequestEditDiary } from "@/api/diary";
import useForm from "@/hooks/useForm";
import { DiaryDetail, EditBlock, ReadBlock } from "@/styles/diary/todayDiary-style";
import { ChangeEvent, useState } from "react";

interface Post {
    createdAt: Date;
    description: string;
    emotion: string;
    id: number;
    private: boolean;
    title: string;
    updatedAt: Date;
    user_model_id: number;
    view: number;
}

interface Props {
    post: Post;
    refetch(): void;
}

const getPostedDate = (createdAt: Date) => {
    const fullDate = new Date(createdAt).toISOString().split("T")[0].split("-");

    return `${fullDate[0]}년 ${fullDate[1]}월 ${fullDate[2]}일`;
};

export default function DiaryTodayPost({ post, refetch }: Props) {
    const { id, title, description, createdAt, private: privateDiary } = post;

    const postedDate = getPostedDate(createdAt);

    const [isEdit, setIsEdit] = useState(false);
    const [privateMode, setPrivateMode] = useState(privateDiary);

    const { form, changeHandler } = useForm({
        title,
        description,
    });

    const { mutate: deleteDiary } = useRequestDeleteDiary(id, {
        onSuccess: () => {
            console.log("일기 삭제 요청 성공");
            refetch();
        },
        onError: () => {
            console.log("일기 삭제 요청 실패");
        },
    });

    const { mutate: editDiary } = useRequestEditDiary({ ...form, privateDiary: privateMode }, id, {
        onSuccess: () => {
            console.log("일기 편집 요청 성공");
            refetch();
        },
        onError: () => {
            console.log("일기 편집 요청 실패");
        },
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
                    <select onChange={selectHandler}>
                        <option value="나만보기">나만보기</option>
                        <option value="전체공개">전체공개</option>
                    </select>
                ) : (
                    <select onChange={selectHandler}>
                        <option value="전체공개">전체공개</option>
                        <option value="나만보기">나만보기</option>
                    </select>
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
