import { useState, forwardRef, useMemo, ForwardedRef } from "react";
import { CardSection, Post, PostDetail, MessageBlock } from "@/styles/home/postList-style";
import { useRequestDeleteDiary, useRequestEditDiary } from "@/api/diary";
import useForm from "@/hooks/useForm";

interface Items {
    id: number;
    title: string;
    description: string;
    emotion: string;
    time: string;
    body: string;
}

interface Props {
    post: Items;
}

export default function AllDiariesPost({ post, refetch }: Props) {
    const [isOpen, setIsOpen] = useState(false);
    const [like, setLike] = useState(false);
    const [editMode, setEditMode] = useState(false);

    const { form, changeHandler } = useForm({ title: post.title, description: post.description });

    const { id, title, description } = post;
    const emotion = "행복";

    const onClick = () => {
        setIsOpen((prev) => !prev);
    };

    const onToggle = () => {
        setLike((prev) => !prev);
    };

    const { mutate: editDiary } = useRequestEditDiary(form, post.id, {
        onSuccess: (res) => {
            console.log(res);
            refetch();
        },
        onError: (error) => {
            console.log(error);
        },
    });

    const { mutate: deleteDiary } = useRequestDeleteDiary(post.id, {
        onSuccess: (res) => {
            console.log(res);
            refetch();
        },
        onError: () => {},
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
                                {post.privateDiary ? (
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
