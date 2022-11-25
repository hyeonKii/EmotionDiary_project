import { useState } from "react";
import { useInfiniteQuery } from "react-query";
import axios from "axios";

import PostItem from "./PostItem";
import usePost from "@/hooks/usePost";
import { TabList } from "@/styles/common/tab-style";

const tabList = ["전체", "자신감", "만족감", "신남", "편안함", "불안", "슬픔", "상처", "분노"];

interface Items {
    userId?: number;
    id: number;
    tag: string;
    body: string;
    time: string;
}

export default function PostList() {
    const [tab, setTab] = useState(0);

    const { fetchNextPage, hasNextPage, isFetchingNextPage, data, status } = useInfiniteQuery(
        "posts",
        ({ pageParam = 1 }) => getPostPage(pageParam),
        {
            getNextPageParam: (lastPage, allPages) => {
                return lastPage && allPages.length + 1;
            },
        }
    );

    const { lastPostRef } = usePost({ isFetchingNextPage, hasNextPage, fetchNextPage });

    const getPostPage = async (page = 1) => {
        const { data } = await axios.get(
            `https://jsonplaceholder.typicode.com/posts?_page=${page}`
        );
        return data;
    };

    const content = data?.pages.map((page: any) => {
        return page.map((post: Items, index: number) => {
            if (page.length === index + 1) {
                return <PostItem ref={lastPostRef} key={post.id} post={post} />;
            }
            return <PostItem key={post.id} post={post} />;
        });
    });

    if (status === "error") return <p>Error</p>;
    if (status === "loading") return <p>Loading</p>;

    return (
        <>
            <TabList>
                {tabList?.map((item, index: number) => (
                    <li
                        key={index}
                        className={tab === index ? "active" : undefined}
                        onClick={() => setTab(index)}
                    >
                        {item}
                    </li>
                ))}
            </TabList>
            <section>
                {content}
                {/* {isFetchingNextPage ? <p>Loading...</p> : undefined} */}
            </section>
        </>
    );
}
