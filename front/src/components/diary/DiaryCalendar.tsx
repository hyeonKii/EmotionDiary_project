import { useEffect, useState } from "react";
import Calendar from "react-calendar";
import useEmotion from "@/hooks/useEmotion";
import { useRequestGetDiary, useRequestGetMonthDiaries } from "@/api/diary";
import { TodaySection, CalendarDetail } from "@/styles/diary/todayDiary-style";
import DiaryTodayPost from "./DiaryTodayPost";
import { currentUser } from "@/temp/userAtom";
import { useRecoilValue } from "recoil";
import { PostInterface } from "./interface/post";
import DiaryCreatePost from "./DiaryCreatePost";

interface MonthData {
    createdAt: Date;
    emotion: string;
    id: number;
}

interface DiaryResponse {
    data: PostInterface;
}

export function DiaryCalendar() {
    const user = useRecoilValue(currentUser);

    const [date, setDate] = useState({
        year: new Date().getFullYear(),
        month: new Date().getMonth() + 1,
    });

    const [id, setId] = useState(0);
    const [diary, setDiary] = useState<PostInterface | null>(null);
    const [clickedDate, setClickedDate] = useState<string>("");

    const { refetch } = useRequestGetDiary(id, {
        retry: false,

        onSuccess: (res: DiaryResponse) => {
            if (res) {
                setDiary(res.data);
                console.log("하루 일기 요청 성공");
            }
        },

        onError: () => {
            console.log("하루 일기 요청 실패");
            setDiary(null);
        },
    });

    const { data: monthDiaries } = useRequestGetMonthDiaries(date.year, date.month, {
        onSuccess: () => {
            console.log("월별 일기 요청 성공");
        },

        onError: () => {
            console.log("월별 일기 요청 실패");
        },
    });

    const { emotionState } = useEmotion(diary?.emotion, user?.nickname);

    const setCurrentDay = (event) => {
        const postDate = new Date(event);
        const clickedDate = postDate.toISOString().split("T")[0];
        const currentDay = postDate.getDate();

        const currentDiary = monthDiaries?.data.find(
            (diary: PostInterface) => currentDay === new Date(diary.createdAt).getDate()
        );

        if (!currentDiary) {
            setDiary(null);
            setClickedDate(clickedDate);
            setId(0);
            return;
        }

        setId(currentDiary.id);
    };

    const setCurrentYearMonth = (event) => {
        const currentYear = event.activeStartDate.getYear() + 1900;
        const currentMonth = (event.activeStartDate.getMonth() + 1).toString().padStart(2, "0");

        setDate({
            year: currentYear,
            month: currentMonth,
        });
    };

    const setEmotionClassName = (date) => {
        const currentDate = new Date(date).getDate();

        const matchedDiary = monthDiaries?.data.find(
            (diary: MonthData) => new Date(diary.createdAt).getDate() === currentDate
        );

        if (matchedDiary) {
            return `${matchedDiary.emotion}`;
        }

        return null;
    };

    return (
        <TodaySection>
            <Calendar
                locale="en-EN"
                onChange={setCurrentDay}
                onActiveStartDateChange={setCurrentYearMonth}
                tileClassName={({ date }) => setEmotionClassName(date)}
            />
            <CalendarDetail>
                {emotionState()}
                {diary && <DiaryTodayPost post={diary} refetch={refetch} />}
                {!diary && clickedDate && (
                    <DiaryCreatePost refetch={refetch} clickedDate={clickedDate} />
                )}
            </CalendarDetail>
        </TodaySection>
    );
}
