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

export default function DiaryTodayPost({ post, refetch }: Props) {
    const fullDate = new Date(post.createdAt).toISOString().split("T")[0].split("-");
    const date = `${fullDate[0]}년 ${fullDate[1]}월 ${fullDate[2]}일`;

    const [isEdit, setIsEdit] = useState(false);
    const [privateDiary, setPrivateDiary] = useState(post.private);

    const { form, changeHandler } = useForm({
        title: post.title,
        description: post.description,
    });

    const { mutate: deleteDiary } = useRequestDeleteDiary(post.id, {
        onSuccess: () => {
            console.log("일기 삭제 요청 성공");
            refetch();
        },
        onError: () => {
            console.log("일기 삭제 요청 실패");
        },
    });

    const { mutate: editDiary } = useRequestEditDiary({ ...form, privateDiary }, post.id, {
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
            setPrivateDiary(true);
            return;
        }

        setPrivateDiary(false);
    };

    return (
        <DiaryDetail isEdit={isEdit}>
            <article className="top">
                <span className="date">{date}</span>
                <div className="icons">
                    {post.private ? (
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
                {post.private ? (
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
                        defaultValue={post.title}
                        onChange={changeHandler}
                    />
                    <textarea
                        id="description"
                        className="description"
                        defaultValue={post.description}
                        onChange={changeHandler}
                        rows={9}
                        autoFocus
                    />
                    <div>
                        <span className={post.description.length < 500 ? "countText" : "maxText"}>
                            {post.description.length}/500
                        </span>
                        <button
                            type="submit"
                            className="submitButton"
                            onClick={editHandler}
                            disabled={
                                post.description.length === 0 ||
                                post.description.length > 500 ||
                                post.title.length === 0
                            }
                        >
                            저장
                        </button>
                    </div>
                </EditBlock>
            ) : (
                <ReadBlock>
                    {<p className="title">{post.title}</p>}
                    {<p className="description">{post.description}</p>}
                </ReadBlock>
            )}
        </DiaryDetail>
    );
}
