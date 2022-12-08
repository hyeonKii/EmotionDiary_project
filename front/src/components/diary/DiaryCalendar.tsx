import { useEffect, useState } from "react";
import Calendar from "react-calendar";
import useEmotion from "@/hooks/useEmotion";
import { useRequestGetDiary, useRequestGetMonthDiaries } from "@/api/diary";
import { TodaySection, CalendarDetail } from "@/styles/diary/todayDiary-style";
import DiaryTodayPost from "./DiaryTodayPost";

interface MonthData {
    createdAt: Date;
    emotion: string;
    id: number;
}

interface Post {
    createdAt: Date;
    emotion: string;
    id: number;
    private: boolean;
    title: string;
    updatedAt: Date;
    user_model_id: number;
    view: number;
}

interface DiaryResponse {
    data: Post;
}

export function DiaryCalendar() {
    const [date, setDate] = useState({
        year: new Date().getFullYear(),
        month: new Date().getMonth() + 1,
    });

    const [id, setId] = useState(0);
    const [diary, setDiary] = useState<Post | null>();

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

    const setCurrentDay = (event) => {
        const currentDay = new Date(event).getDate();

        const currentDiary = monthDiaries?.data.find(
            (diary: Post) => currentDay === new Date(diary.createdAt).getDate()
        );

        if (!currentDiary) {
            setDiary(null);
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
                {/* {emotionState()} */}
                {diary && <DiaryTodayPost post={diary} refetch={refetch} />}
            </CalendarDetail>
        </TodaySection>
    );
}
