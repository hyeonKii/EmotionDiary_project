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

const currentDate = new Date();
const currentYear = currentDate.getFullYear();
const currentMonth = currentDate.getMonth() + 1;
const currentDay = currentDate.getDate();

console.log(currentDate, currentYear, currentMonth, currentDay);

const getCurrentDiary = (data, day) => {
    return data.find((diary: PostInterface) => new Date(diary.createdAt).getDate() === day);
};

export function DiaryCalendar() {
    const user = useRecoilValue(currentUser);

    const [date, setDate] = useState({
        year: currentYear,
        month: currentMonth,
    });

    const [day, setDay] = useState(currentDay);
    const [id, setID] = useState(null);
    const [diary, setDiary] = useState<PostInterface | null>(null);

    const { emotionState } = useEmotion(diary?.emotion, user?.nickname);

    const { refetch: getDiary } = useRequestGetDiary(id, {
        onSuccess: (res) => {
            console.log("일기 요청 성공");

            if (!res) {
                return;
            }

            setDiary(res.data);
        },

        onError: () => {
            console.log("일기 요청 실패");
        },
    });

    const { refetch: getMonthDiaries, data: monthDiaries } = useRequestGetMonthDiaries(
        date.year,
        date.month,
        "calendar-diaries",
        {
            onSuccess: (res) => {
                console.log(res);

                const currentDiary = getCurrentDiary(res.data, day);

                if (currentDiary) {
                    setID(currentDiary.id);
                    return;
                }

                setID(null);
                setDiary(null);

                console.log("월별 일기 요청 성공");
            },

            onError: () => {
                console.log("월별 일기 요청 실패");
            },
        }
    );

    const setCurrentDay = (event) => {
        const postDate = new Date(event);

        postDate.setHours(12);

        const clickedDay = postDate.getDate();

        setDay(clickedDay);

        if (monthDiaries) {
            const { data } = monthDiaries;

            const currentDiary = getCurrentDiary(data, clickedDay);

            if (currentDiary) {
                setID(currentDiary.id);
                return;
            }
        }

        setDiary(null);
        setID(null);
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
        const currentDate = new Date(date);
        const currentDay = currentDate.getDate();
        const currentMonth = currentDate.getMonth();

        if (monthDiaries) {
            const matchedDiary = monthDiaries?.data.find(
                (diary: MonthData) =>
                    new Date(diary.createdAt).getDate() === currentDay &&
                    new Date(diary.createdAt).getMonth() === currentMonth
            );

            if (matchedDiary) {
                return `${matchedDiary.emotion}`;
            }
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
                defaultValue={currentDate}
            />
            <CalendarDetail>
                {emotionState()}
                {diary ? (
                    <DiaryTodayPost
                        post={diary}
                        getDiary={getDiary}
                        getMonthDiaries={getMonthDiaries}
                    />
                ) : (
                    <DiaryCreatePost getMonthDiaries={getMonthDiaries} day={day} />
                )}
            </CalendarDetail>
        </TodaySection>
    );
}
