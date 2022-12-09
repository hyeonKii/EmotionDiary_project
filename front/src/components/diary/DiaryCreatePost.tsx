import { useRequestWriteDiary } from "@/api/diary";
import useForm from "@/hooks/useForm";
import { DiaryDetail, EditBlock } from "@/styles/diary/todayDiary-style";
import { ChangeEvent, useState } from "react";

interface Props {
    refetch(): void;
}

const getCurrentDate = (clickedDate) => {
    const currentDate = clickedDate.split("-");

    return `${currentDate[0]}년 ${currentDate[1]}월 ${currentDate[2]}일`;
};

export default function DiaryCreatePost({ refetch, clickedDate }: Props) {
    const date = getCurrentDate(clickedDate);

    const [privateMode, setPrivateMode] = useState(true);

    const { form, changeHandler } = useForm({
        title: "",
        description: "",
    });

    const { mutate: writeHandler } = useRequestWriteDiary(
        { ...form, privateDiary: privateMode },
        {
            onSuccess: () => {
                console.log("일기 작성 요청 성공");
                refetch();
            },
            onError: () => {
                console.log("일기 작성 요청 실패");
            },
        }
    );

    const selectHandler = (event: ChangeEvent<HTMLSelectElement>) => {
        const { value } = event.target;

        if (value === "나만보기") {
            setPrivateMode(true);
            return;
        }

        setPrivateMode(false);
    };

    return (
        <DiaryDetail>
            <article className="top">
                {clickedDate && <span className="date">{date}</span>}
                <select onChange={selectHandler}>
                    <option value="나만보기">나만보기</option>
                    <option value="전체공개">전체공개</option>
                </select>
            </article>
            <EditBlock>
                <input
                    id="title"
                    className="title"
                    value={form.title}
                    placeholder={"제목"}
                    onChange={changeHandler}
                />
                <textarea
                    id="description"
                    className="description"
                    value={form.description}
                    onChange={changeHandler}
                    placeholder={"내용"}
                    rows={9}
                    autoFocus
                />
                <div>
                    <span className={form.description.length < 500 ? "countText" : "maxText"}>
                        {form.description.length}/500
                    </span>
                    <button
                        type="submit"
                        className="submitButton"
                        onClick={() => writeHandler()}
                        disabled={
                            form.description.length === 0 ||
                            form.description.length > 500 ||
                            form.title.length === 0
                        }
                    >
                        저장
                    </button>
                </div>
            </EditBlock>
        </DiaryDetail>
    );
}
