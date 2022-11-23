import { useCallback, useRef, useState } from "react";
import { useInfiniteQuery } from "react-query";
import axios from "axios";

import PostItem from "./PostItem";
import { TabBlock } from "@/styles/home/postList-style";

const tagList = ["전체", "행복", "분노", "슬픔", "혐오", "경멸", "두려움", "놀라움"];

interface Items {
    id: number;
    tag: string;
    body: string;
    time: string;
}

export default function PostList() {
    const [tag, setTag] = useState(0);
    const intObserver = useRef<IntersectionObserver | null>(null);

    const getPostPage = async (page = 1) => {
        const { data } = await axios.get(
            `https://jsonplaceholder.typicode.com/posts?_page=${page}`
        );
        return data;
    };

    const { fetchNextPage, hasNextPage, isFetchingNextPage, data, status } = useInfiniteQuery(
        "posts",
        ({ pageParam = 1 }) => getPostPage(pageParam),
        {
            getNextPageParam: (lastPage, allPages) => {
                return lastPage && allPages.length + 1;
            },
        }
    );

    const lastPostRef = useCallback(
        (post: Element) => {
            if (isFetchingNextPage) return;
            if (intObserver.current) intObserver.current.disconnect();
            intObserver.current = new IntersectionObserver((posts) => {
                if (posts[0].isIntersecting && hasNextPage) {
                    fetchNextPage();
                }
            });
            if (post) intObserver.current.observe(post);
        },
        [isFetchingNextPage, fetchNextPage, hasNextPage]
    );

    if (status === "error") return <p>Error</p>;

    const content = data?.pages.map((page) => {
        return page.map((post: Items, index: number) => {
            if (page.length === index + 1) {
                return <PostItem ref={lastPostRef} key={post.id} post={post} />;
            }
            return <PostItem key={post.id} post={post} />;
        });
    });

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
            <section>
                {content}
                {isFetchingNextPage && <p>Loading...</p>}
            </section>
        </>
    );
}
