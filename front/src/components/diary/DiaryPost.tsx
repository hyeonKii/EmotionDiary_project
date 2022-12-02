import { useState } from "react";
import { CardSection, Post, PostDetail } from "@/styles/home/postList-style";
import { useRequestDeleteDiary, useRequestEditDiary } from "@/api/diary";
import useForm from "@/hooks/useForm";

interface Items {
    id: number;
    title: string;
    description: string;
    emotion: string;
    time: string;
    body: string;
    privateDiary: boolean;
}

interface Props {
    post: Items;
    refetch(): void;
}

interface Error {
    message: string;
}

export default function DiaryPost({ post, refetch }: Props) {
    const [isOpen, setIsOpen] = useState(false);
    const [editMode, setEditMode] = useState(false);

    const { id, title, description, privateDiary } = post;

    const { form, changeHandler } = useForm({ title, description });

    const emotion = "행복";

    const onClick = () => {
        setIsOpen((prev) => !prev);
    };

    const { mutate: editDiary } = useRequestEditDiary(form, id, {
        onSuccess: () => {
            refetch();
        },
        onError: (error: Error) => {
            console.log(error.message);
        },
    });

    const { mutate: deleteDiary } = useRequestDeleteDiary(id, {
        onSuccess: () => {
            refetch();
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

    return (
        <>
            <CardSection>
                <Post onClick={onClick} isOpen={isOpen} emotion={emotion}>
                    <span className="emotion">{emotion}</span>
                    <span className="title">{title}</span>
                    <div className="time">
                        <span>3시간 전</span>
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
