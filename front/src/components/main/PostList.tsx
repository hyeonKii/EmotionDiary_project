import { useState } from "react";
import PostItem from "./PostItem";
import { TabBlock, PostItemBlock } from "../../styles/main/postList-style";
import items from "./items.json";

const tagList = ["전체", "행복", "분노", "슬픔", "경멸", "두려움", "놀라움"];

export default function PostList() {
    const [tag, setTag] = useState(0);
    return (
        <>
            <TabBlock>
                {tagList?.map((item, index: number) => (
                    <li
                        key={index}
                        className={tag === index ? "active" : ""}
                        onClick={() => setTag(index)}
                    >
                        {item}
                    </li>
                ))}
            </TabBlock>
            <PostItemBlock>
                {items?.map((item) => (
                    <PostItem key={item.id} item={item} />
                ))}
            </PostItemBlock>
        </>
    );
}
