import { useState, forwardRef, Ref } from "react";
import { CardBlock, OpenBlock, CloseBlock } from "@/styles/home/postList-style";

interface Items {
    id: number;
    tag: string;
    body: string;
    time: string;
}

interface Props {
    post: Items;
}

function PostItem({ post }: Props, ref: any) {
    const [isOpen, setIsOpen] = useState(false);
    const { id, tag, body } = post;

    const onClick = () => {
        setIsOpen((prev) => !prev);
    };

    const itemBody = (
        <>
            <CloseBlock onClick={onClick} isOpen={isOpen} tag={tag}>
                <span className="tag">{id}</span>
                <span className="body">{body}</span>
                <div className="time">
                    <span>3시간 전</span>
                    <span className="arrow">{isOpen ? "▲" : "▼"}</span>
                </div>
            </CloseBlock>
            {isOpen && (
                <OpenBlock>
                    <input
                        type="text"
                        placeholder="메시지는 익명으로 전송됩니다. 속마음을 나눠보세요!"
                        autoFocus
                    />
                    <button>전송</button>
                </OpenBlock>
            )}
        </>
    );

    return ref ? <CardBlock ref={ref}>{itemBody}</CardBlock> : <CardBlock>{itemBody}</CardBlock>;
}

export default forwardRef(PostItem);
