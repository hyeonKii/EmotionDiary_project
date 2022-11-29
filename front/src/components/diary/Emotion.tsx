import { Radar, RadarChart, PolarGrid, PolarAngleAxis } from "recharts";
import {
    EmotionSection,
    EmotionChartSection,
    EmotionDataSection,
} from "@/styles/diary/emotion-style";

const data = {
    nickname: "윤아",
    emotion: "",
    body: "오늘 너무 힘들었다. 내일은 안 힘들겠지? 슬프다",
    state: "나만보기",
    date: "Fri Nov 22 2022 00:00:00 GMT+0900",
};

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
    const topEmotion = chart.reduce((a, b) => {
        return a.A > b.A ? a : b;
    });
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth();
    const day = today.getDate();

    const dayAgo = new Date(year, month, day - 7).toLocaleDateString("ko-KR", {
        year: "numeric",
        month: "long",
        day: "numeric",
    });

    const aMonthAgo = new Date(year, month - 1, day).toLocaleDateString("ko-KR", {
        year: "numeric",
        month: "long",
        day: "numeric",
    });

    const aYearAgo = new Date(year - 1, month, day).toLocaleDateString("ko-KR", {
        year: "numeric",
        month: "long",
        day: "numeric",
    });

    return (
        <EmotionSection>
            <h1>
                <span>{data.nickname}</span>님의 지난달 감정들
            </h1>
            <EmotionChartSection>
                <RadarChart width={450} height={450} data={chart}>
                    <PolarGrid />
                    <PolarAngleAxis dataKey="emotion" />
                    <Radar dataKey="A" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
                </RadarChart>
                <span>
                    지난 한 달 간의 감정들 입니다.
                    <br />
                    가장 많이 자치한 감정은 <strong>{topEmotion.emotion}</strong>
                    이군요! <br />
                    자신의 감정을 돌아보는 건 <br />
                    정서적 건강을 관리하는 데 도움이 됩니다. <br />
                    꾸준히 기록하며 마음을 되돌아 보세요!
                </span>
            </EmotionChartSection>
            <EmotionDataSection>
                <article>
                    <h3>일주일 전 오늘</h3>
                    <span className="emotionIcon">😶</span>
                    <span>{dayAgo}</span>
                    <span className="body">기록이 없습니다!</span>
                </article>
                <article>
                    <h3>한 달 전 오늘</h3>
                    <span className="emotionIcon">😥</span>
                    <span>{aMonthAgo}</span>
                    <span className="body">{data.body}</span>
                </article>
                <article>
                    <h3>일 년 전 오늘</h3>
                    <span className="emotionIcon">😶</span>
                    <span>{aYearAgo}</span>
                    <span className="body">기록이 없습니다!</span>
                </article>
            </EmotionDataSection>
        </EmotionSection>
    );
}
