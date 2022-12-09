import { useEffect, useState } from "react";

interface Props {
    page: number;
    setPage(value: number): void;
    diaryCount: number;
    count: number;
}
const PAGE_LIMIT = 10;

export default function DiaryPageButton({ page, setPage, diaryCount, count }: Props) {
    const pageButtonCount = Math.ceil(diaryCount / count);
    const pageButtonList = new Array(pageButtonCount).fill(0);
    const currentIndexPos = Math.floor(page / PAGE_LIMIT);

    const [index, setIndex] = useState({
        startIndex: 0 + currentIndexPos * PAGE_LIMIT,
        endIndex: PAGE_LIMIT + currentIndexPos * PAGE_LIMIT,
    });

    const startPageBtn = () => {
        if (page === 1) {
            return;
        }

        setPage(1);
    };

    const lastPageBtn = () => {
        if (page === pageButtonCount) {
            return;
        }

        setPage(pageButtonCount);
    };

    const leftBtn = () => {
        if (page === 1) {
            return;
        }

        setPage(page - 1);
    };

    const rightBtn = () => {
        if (page === pageButtonCount) {
            return;
        }

        setPage(page + 1);
    };

    useEffect(() => {
        const pageIndex = Math.floor((page - 1) / PAGE_LIMIT);

        setIndex({
            startIndex: pageIndex * PAGE_LIMIT,
            endIndex: pageIndex * PAGE_LIMIT + PAGE_LIMIT,
        });
    }, [page]);

    return (
        <>
            <button onClick={startPageBtn}>&lt;&lt;</button>
            <button onClick={leftBtn}>&lt;</button>
            {pageButtonCount &&
                pageButtonList.slice(index.startIndex, index.endIndex).map((_, i) => (
                    <button
                        style={{ fontWeight: i + 1 + index.startIndex === page ? "bold" : "" }}
                        key={i + index.startIndex + "button"}
                        onClick={() => setPage(i + 1 + index.startIndex)}
                    >
                        {i + 1 + index.startIndex}
                    </button>
                ))}
            <button onClick={rightBtn}>&gt;</button>
            <button onClick={lastPageBtn}>&gt;&gt;</button>
        </>
    );
}
