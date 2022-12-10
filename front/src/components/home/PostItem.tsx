import { useState, forwardRef, useMemo, ForwardedRef } from "react";
import { CardSection, Post, PostDetail, MessageBlock } from "@/styles/home/postList-style";

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

function PostItem({ post }: Props, ref: ForwardedRef<HTMLElement>) {
    const [isOpen, setIsOpen] = useState(false);
    const [like, setLike] = useState(false);
    const { id, emotion, title, description, body } = post;

    const onClick = () => {
        setIsOpen((prev) => !prev);
    };

    const onToggle = () => {
        setLike((prev) => !prev);
    };

    const itemBody = useMemo(() => {
        return (
            <>
                <Post onClick={onClick} isOpen={isOpen} emotion={emotion}>
                    <span className="emotion">{id}</span>
                    <span className="title">{title}</span>
                    <div className="time">
                        <span>3시간 전</span>
                        <span className="arrow">{isOpen ? "▲" : "▼"}</span>
                    </div>
                </Post>
                {isOpen && (
                    <PostDetail>
                        <p className="description">{body}</p>
                        <div>
                            <MessageBlock>
                                <input
                                    type="text"
                                    placeholder="메시지는 익명으로 전송됩니다. 속마음을 나눠보세요!"
                                    autoFocus
                                />
                                <button className="submitButton">전송</button>
                            </MessageBlock>
                            <button
                                className={like ? "material-icons" : "material-symbols-outlined"}
                                onClick={onToggle}
                            >
                                thumb_up
                            </button>
                        </div>
                    </PostDetail>
                )}
            </>
        );
    }, [isOpen, like, post]);

    return ref ? (
        <CardSection ref={ref}>{itemBody}</CardSection>
    ) : (
        <CardSection>{itemBody}</CardSection>
    );
}

export default forwardRef(PostItem);
