import { useState, forwardRef, useMemo, ForwardedRef } from "react";
import { CardSection, Post, PostDetail } from "@/styles/home/postList-style";

interface Items {
    id: number;
    tag: string;
    body: string;
    time: string;
}

interface Props {
    post: Items;
}

function PostItem({ post }: Props, ref: ForwardedRef<HTMLElement>) {
    const [isOpen, setIsOpen] = useState(false);
    const { id, tag, body } = post;

    const onClick = () => {
        setIsOpen((prev) => !prev);
    };

    const itemBody = useMemo(() => {
        return (
            <>
                <Post onClick={onClick} isOpen={isOpen} tag={tag}>
                    <span className="tag">{id}</span>
                    <span className="body">{body}</span>
                    <div className="time">
                        <span>3시간 전</span>
                        <span className="arrow">{isOpen ? "▲" : "▼"}</span>
                    </div>
                </Post>
                {isOpen && (
                    <PostDetail>
                        <input
                            type="text"
                            placeholder="메시지는 익명으로 전송됩니다. 속마음을 나눠보세요!"
                            autoFocus
                        />
                        <button>전송</button>
                    </PostDetail>
                )}
            </>
        );
    }, [isOpen]);

    return ref ? (
        <CardSection ref={ref}>{itemBody}</CardSection>
    ) : (
        <CardSection>{itemBody}</CardSection>
    );
}

export default forwardRef(PostItem);
