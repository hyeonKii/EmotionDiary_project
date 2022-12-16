import { useRequestWriteDiary } from "@/api/diary";
import useForm from "@/hooks/useForm";
import { SelectStyle } from "@/styles/diary/diary-style";
import { DiaryDetail, EditBlock } from "@/styles/diary/todayDiary-style";
import { aMonthAgo, aYearAgo, dayAgo } from "@/util/date";
import { ChangeEvent, useState } from "react";
import { useQueryClient } from "react-query";

interface Props {
    clickedDate: Date | null;
}

const getCurrentDateText = (dayToDate: Date | null) => {
    if (!dayToDate) {
        return;
    }

    const currentDate = new Date(dayToDate);

    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth() + 1;
    const currentDay = currentDate.getDate();

    return `${currentYear}년 ${currentMonth}월 ${currentDay}일`;
};

export default function DiaryCreatePost({ clickedDate }: Props) {
    const queryClient = useQueryClient();

    const currentDate = new Date(clickedDate as Date);
    currentDate.setHours(currentDate.getHours() + 9);

    const currentDateText = getCurrentDateText(clickedDate);

    const [privateMode, setPrivateMode] = useState(true);

    const { form, changeHandler } = useForm({
        title: "",
        description: "",
    });

    const { mutate: writeHandler } = useRequestWriteDiary(
        { ...form, privateDiary: privateMode, createdAt: currentDate as Date },
        {
            onSuccess: async () => {
                await queryClient.invalidateQueries(["calendar-diaries"]);
                await queryClient.invalidateQueries(["past-diaries"]);
            },
            onError: () => {},
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
        <DiaryDetail isEdit={true}>
            <article className="top">
                {clickedDate && <span className="date">{currentDateText}</span>}
                <SelectStyle onChange={selectHandler}>
                    <option value="나만보기">&#128274; 나만보기</option>
                    <option value="전체공개">&#128275; 전체공개</option>
                </SelectStyle>
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
