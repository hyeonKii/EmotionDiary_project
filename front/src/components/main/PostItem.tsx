import { useState } from "react";
import { CardBlock, OpenBlock, CloseBlock } from "../../styles/main/postList-style";

interface Items {
    id: number;
    tag: string;
    body: string;
    time: string;
}

interface ItemProps {
    item: Items;
}

export default function PostItem({ item }: ItemProps) {
    const [isOpen, setIsOpen] = useState(false);
    const { tag, body, time } = item;

    const onClick = () => {
        setIsOpen((prev) => !prev);
    };

    return (
        <CardBlock>
            <CloseBlock onClick={onClick} isOpen={isOpen} tag={tag}>
                <div className="tag">{tag}</div>
                <div className="body">
                    <span>{body}</span>
                </div>
                <div className="time">
                    <span>{time}</span>
                    <span className="arrow">{isOpen ? "▲" : "▼"}</span>
                </div>
            </CloseBlock>
            {isOpen && (
                <div>
                    <OpenBlock>
                        <input
                            type="text"
                            placeholder="메시지는 익명으로 전송됩니다. 속마음을 나눠보세요!"
                            autoFocus
                        />
                        <button>전송</button>
                    </OpenBlock>
                </div>
            )}
        </CardBlock>
    );
}
