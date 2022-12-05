import { useCallback, useRef } from "react";

interface Props {
    isFetchingNextPage: boolean;
    hasNextPage: boolean | undefined;
    fetchNextPage: () => void;
}

export default function usePost({ isFetchingNextPage, hasNextPage, fetchNextPage }: Props) {
    const intObserver = useRef<IntersectionObserver | null>(null);

    const lastPostRef = useCallback(
        (post: HTMLElement) => {
            if (isFetchingNextPage) return;
            if (intObserver.current) intObserver.current.disconnect();
            intObserver.current = new IntersectionObserver((posts, observer) => {
                if (posts[0].isIntersecting && hasNextPage) {
                    fetchNextPage();
                    observer.unobserve(posts[0].target);
                }
            });
            if (post) intObserver.current.observe(post);
        },
        [isFetchingNextPage, fetchNextPage, hasNextPage]
    );
    return { lastPostRef };
}
