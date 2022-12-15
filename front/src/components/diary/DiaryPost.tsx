import { useState } from "react";
import { CardSection, Post, PostDetail } from "@/styles/home/postList-style";
import { useRequestDeleteDiary, useRequestEditDiary } from "@/api/diary";
import useForm from "@/hooks/useForm";
import { PostInterface } from "./interface/post";
import { useQueryClient } from "react-query";

interface Props {
    post: PostInterface;
}

interface Error {
    message: string;
}

const getPostedTime = (createdAt: Date) => {
    const currentDate = new Date();
    const createdDate = new Date(createdAt);

    const createdYear = createdDate.getFullYear();
    const createdMonth = createdDate.getMonth() + 1;

    const createdDay = createdDate.getDate();
    const currentDay = currentDate.getDate();

    const currentHour = currentDate.getHours();
    const createdHour = createdDate.getHours();

    if (currentDay - createdDay === 0) {
        return currentHour - createdHour === 0 ? "방금 전" : `${currentHour - createdHour}시간 전`;
    }

    return `${createdYear}.${createdMonth}.${createdDay}`;
};

export default function DiaryPost({ post }: Props) {
    const { id, title, description, createdAt, emotion, private: privateDiary } = post;

    const queryClient = useQueryClient();

    const postedDate = getPostedTime(createdAt);

    const [isOpen, setIsOpen] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [privateMode, setPrivateMode] = useState(privateDiary);

    const { form, changeHandler } = useForm({ title, description });

    const onClick = () => {
        setIsOpen((prev) => !prev);
    };

    const { mutate: editDiary } = useRequestEditDiary({ ...form, privateDiary: privateMode }, id, {
        onSuccess: () => {
            queryClient.invalidateQueries(["my-diaries"]);
        },
        onError: (error: Error) => {
            console.log(error.message);
        },
    });

    const { mutate: deleteDiary } = useRequestDeleteDiary(id, {
        onSuccess: () => {
            queryClient.invalidateQueries(["my-diaries"]);
        },
        onError: (error: Error) => {
            console.log(error.message);
        },
    });

    const deleteHandler = () => {
        deleteDiary();
    };

    const editHandler = () => {
        editDiary();
        setEditMode(false);
    };

    const selectHandler = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const { value } = event.target;

        if (value === "나만보기") {
            setPrivateMode(true);
            return;
        }

        setPrivateMode(false);
    };

    return (
        <>
            <CardSection>
                <Post onClick={onClick} isOpen={isOpen} emotion={emotion}>
                    <span className="emotion">{emotion}</span>
                    <span className="title">{title}</span>
                    <div className="time">
                        <span>{postedDate}</span>
                        <span className="arrow">{isOpen ? "▲" : "▼"}</span>
                    </div>
                </Post>
                {isOpen && (
                    <PostDetail>
                        {editMode ? (
                            <>
                                <input
                                    type="texarea"
                                    defaultValue={description}
                                    onChange={changeHandler}
                                    id="description"
                                />
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
                                <button onClick={editHandler}>저장</button>
                            </>
                        ) : (
                            <>
                                <p className="description">{description}</p>
                                {privateDiary ? (
                                    <span className="material-symbols-outlined">lock</span>
                                ) : (
                                    <span className="material-symbols-outlined">lock_open</span>
                                )}
                                <button
                                    className="material-symbols-outlined"
                                    onClick={() => setEditMode(true)}
                                >
                                    edit
                                </button>
                                <button
                                    className="material-symbols-outlined"
                                    onClick={deleteHandler}
                                >
                                    delete
                                </button>
                            </>
                        )}
                    </PostDetail>
                )}
            </CardSection>
        </>
    );
}
