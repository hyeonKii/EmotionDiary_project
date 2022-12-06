import { useState } from "react";

interface Props {
    page: number;
    setPage(value: number): void;
    diaryCount: number;
    count: number;
}

export default function DiaryPageButton({ page, setPage, diaryCount, count }: Props) {
    const PAGE_LIMIT = 10;

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
        setIndex({ startIndex: 0, endIndex: PAGE_LIMIT });
    };

    const lastPageBtn = () => {
        if (page === pageButtonCount) {
            return;
        }

        const lastIndex = Math.ceil(pageButtonCount / PAGE_LIMIT) * PAGE_LIMIT;

        const startIndex = lastIndex - 10;
        const endIndex = lastIndex;

        setPage(pageButtonCount);
        setIndex({ startIndex, endIndex });
    };

    const leftBtn = () => {
        if (index.startIndex === 0) {
            return;
        }

        setPage(index.startIndex - PAGE_LIMIT + 1);

        setIndex((prevState) => ({
            startIndex: prevState.startIndex - PAGE_LIMIT,
            endIndex: prevState.endIndex - PAGE_LIMIT,
        }));
    };

    const rightBtn = () => {
        if (index.endIndex > pageButtonCount) {
            return;
        }

        setPage(index.endIndex + 1);

        setIndex((prevState) => ({
            startIndex: prevState.startIndex + PAGE_LIMIT,
            endIndex: prevState.endIndex + PAGE_LIMIT,
        }));
    };

    return (
        <>
            <button onClick={startPageBtn}>처음 페이지</button>
            <button onClick={leftBtn}>이전 페이지</button>
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
            <button onClick={rightBtn}>다음 페이지</button>
            <button onClick={lastPageBtn}>마지막 페이지</button>
        </>
    );
}
