import { useEffect, useState } from "react";
import { useInfiniteQuery } from "react-query";
import * as api from "@/api/diary";

import PostItem from "./PostItem";
import Loading from "@/components/UI/Loading";
import usePost from "@/hooks/usePost";
import { none, postLoading } from "@/assets/images";
import { TabList } from "@/styles/common/tab-style";
import { Empty, LoadingStyle } from "@/styles/common/empty/empty-style";

const tabList = [
    "전체",
    "자신감",
    "만족감",
    "신남",
    "편안함",
    "불안",
    "슬픔",
    "상처",
    "분노",
] as const;
type TabList = typeof tabList[number];

interface Items {
    id: number;
    title: string;
    description: string;
    emotion: string;
    createdAt: Date;
    user_model_id: number;
}

export default function PostList() {
    const [tab, setTab] = useState<TabList>("전체");
    const { fetchNextPage, hasNextPage, isFetchingNextPage, data, error, status, refetch } =
        useInfiniteQuery("posts", ({ pageParam = 1 }) => getPostPage(pageParam), {
            getNextPageParam: (lastPage, allPages) => {
                return lastPage?.length ? allPages?.length + 1 : undefined;
            },
        });

    const { lastPostRef } = usePost({ isFetchingNextPage, hasNextPage, fetchNextPage });

    const getPostPage = async (page = 1) => {
        try {
            const { data } = await api.getDiary(10, page, tab);
            console.log(tab);
            return data;
        } catch (e) {
            console.error(e);
        }
    };

    useEffect(() => {
        refetch();
    }, [tab]);

    const content = data?.pages?.map((page) => {
        console.log(page, data);

        if (data?.pages[0].length === 0) {
            return (
                <Empty>
                    <img src={none} alt="none" />
                    <span>등록된 게시물이 없습니다.</span>
                </Empty>
            );
        }
        return page?.map((post: Items, index: number) => {
            if (page?.length === index + 1) {
                return <PostItem ref={lastPostRef} key={post.id} post={post} />;
            }
            return <PostItem key={post.id} post={post} />;
        });
    });

    if (status === "error") return <>Error: {error}</>;
    if (status === "loading") return <Loading />;

    return (
        <>
            <TabList>
                {tabList?.map((tabName) => (
                    <li
                        key={tabName}
                        className={tab === tabName ? "active" : undefined}
                        onClick={() => setTab(tabName)}
                    >
                        {tabName}
                    </li>
                ))}
            </TabList>
            <section>
                {content}
                {isFetchingNextPage && (
                    <LoadingStyle>
                        <span>Loading...</span>
                        <img src={postLoading} alt="loading" />
                    </LoadingStyle>
                )}
            </section>
        </>
    );
}
