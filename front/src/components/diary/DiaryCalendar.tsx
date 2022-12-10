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

const getCurrentDiary = (data, date) => {
    return data.find(
        (diary: PostInterface) => new Date(diary.createdAt).getDate() === new Date(date).getDate()
    );
};

export function DiaryCalendar() {
    const user = useRecoilValue(currentUser);

    const [date, setDate] = useState({
        year: currentYear,
        month: currentMonth,
    });

    const [fullDate, setFullDate] = useState(currentDate);
    const [id, setID] = useState(null);
    const [diary, setDiary] = useState<PostInterface | null>(null);

    const { emotionState } = useEmotion(diary?.emotion, user?.nickname);

    const { isSuccess: userDiaryCheck, data: userDiary } = useRequestGetDiary(id, {
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

    const { isSuccess: monthDiariesCheck, data: monthDiaries } = useRequestGetMonthDiaries(
        date.year,
        date.month,
        "calendar-diaries",
        {
            onSuccess: (res) => {
                const currentDiary = getCurrentDiary(res.data, fullDate);

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

        setFullDate(postDate);

        if (monthDiaries) {
            const { data } = monthDiaries;

            const currentDiary = getCurrentDiary(data, postDate);

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

    // useEffect(() => {
    //     const currentDiary = getCurrentDiary(monthDiaries, fullDate);

    //     if (currentDiary) {
    //         setID(currentDiary.id);
    //         return;
    //     }

    //     setID(null);
    //     setDiary(null);

    // }, [monthDiariesCheck])

    // useEffect(() => {
    //     if (!userDiary) {
    //         return;
    //     }

    //     setDiary(userDiary.data);

    // }, [userDiaryCheck])

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
                {diary ? <DiaryTodayPost post={diary} /> : <DiaryCreatePost fullDate={fullDate} />}
            </CalendarDetail>
        </TodaySection>
    );
}
