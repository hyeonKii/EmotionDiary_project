import { useState } from "react";
import { Radar, RadarChart, PolarGrid, PolarAngleAxis } from "recharts";
import { useRecoilValue } from "recoil";

import { useRequestGetMonthDiaries, useRequestPastDiaries } from "@/api/diary";
import { currentUser } from "@/temp/userAtom";
import { dayAgo, aMonthAgo, aYearAgo, dayString, monthString, yearString } from "@/util/date";
import { emotionImg } from "@/hooks/useEmotion";
import { PostInterface } from "./interface/post";
import {
    EmotionSection,
    EmotionChartSection,
    EmotionDataSection,
    ChartBlock,
} from "@/styles/diary/emotion-style";

const chart = [
    {
        emotion: "자신감",
        A: 80,
    },
    {
        emotion: "만족감",
        A: 98,
    },
    {
        emotion: "신남",
        A: 86,
    },
    {
        emotion: "편안함",
        A: 99,
    },
    {
        emotion: "불안",
        A: 85,
    },
    {
        emotion: "슬픔",
        A: 65,
    },
    {
        emotion: "상처",
        A: 65,
    },
    {
        emotion: "분노",
        A: 65,
    },
];

export function Emotion() {
    const user = useRecoilValue(currentUser);

    const topEmotion = chart.reduce((a, b) => {
        return a.A > b.A ? a : b;
    });

    const { data: pastDiaries } = useRequestPastDiaries({
        onSuccess: () => {},
        onError: () => {},
    });

    const day = pastDiaries?.data[0];
    const month = pastDiaries?.data[1];
    const year = pastDiaries?.data[2];

    return (
        <EmotionSection>
            <EmotionChartSection>
                <h1>
                    <span className="nickName">{user?.nickname}</span>님의 지난달 감정들
                </h1>
                <ChartBlock>
                    <RadarChart width={600} height={600} data={chart}>
                        <PolarGrid />
                        <PolarAngleAxis dataKey="emotion" />
                        <Radar dataKey="A" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
                    </RadarChart>
                    <span className="description">
                        지난 한 달 간의 감정들 입니다.
                        <br />
                        가장 많이 자치한 감정은 <strong>{topEmotion.emotion}</strong>
                        이군요! <br />
                        자신의 감정을 돌아보는 건 <br />
                        정서적 건강을 관리하는 데 도움이 됩니다. <br />
                        꾸준히 기록하며 마음을 되돌아 보세요!
                    </span>
                </ChartBlock>
            </EmotionChartSection>
            <EmotionDataSection>
                <article>
                    <h3>일주일 전 오늘</h3>
                    <span className="emotionIcon">{emotionImg(day?.emotion)}</span>
                    <span className="date">{dayString}</span>
                    <div className="diary">
                        <span>{day?.title}</span>
                        <span className="body">
                            {day?.description ? day.description : "작성된 글이 없습니다."}
                        </span>
                    </div>
                </article>
                <article>
                    <h3>한 달 전 오늘</h3>
                    <span className="emotionIcon">{emotionImg(month?.emotion)}</span>
                    <span className="date">{monthString}</span>
                    <div className="diary">
                        <span>{month?.title}</span>
                        <span className="body">
                            {month?.description ? month?.description : "작성된 글이 없습니다."}
                        </span>
                    </div>
                </article>
                <article>
                    <h3>일 년 전 오늘</h3>
                    <span className="emotionIcon">{emotionImg(year?.emotion)}</span>
                    <span className="date">{yearString}</span>
                    <div className="diary">
                        <span>{year?.title}</span>
                        <span className="body">
                            {year?.description ? year?.description : "작성된 글이 없습니다."}
                        </span>
                    </div>
                </article>
            </EmotionDataSection>
        </EmotionSection>
    );
}
