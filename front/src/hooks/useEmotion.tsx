import { useCallback } from "react";
import { Message } from "@/styles/diary/todayDiary-style";
import {
    angry,
    anxiety,
    comfort,
    confidence,
    happy,
    none,
    sad,
    satisfaction,
    wound,
} from "@/assets/images";

const EmotionToImg = {
    신남: <img src={happy} alt="happy" className="emotionIcon" />,
    자신감: <img src={confidence} alt="confidence" className="emotionIcon" />,
    만족감: <img src={satisfaction} alt="satisfaction" className="emotionIcon" />,
    편안함: <img src={comfort} alt="comfort" className="emotionIcon" />,
    슬픔: <img src={sad} alt="sad" className="emotionIcon" />,
    불안: <img src={wound} alt="wound" className="emotionIcon" />,
    상처: <img src={anxiety} alt="anxiety" className="emotionIcon" />,
    분노: <img src={angry} alt="angry" className="emotionIcon" />,
    normal: <img src={none} alt="normal" className="emotionIcon" />,
};

export const emotionImg = (emotion: string) => {
    if (
        emotion === "신남" ||
        emotion === "자신감" ||
        emotion === "만족감" ||
        emotion === "편안함" ||
        emotion === "슬픔" ||
        emotion === "불안" ||
        emotion === "상처" ||
        emotion === "분노" ||
        emotion === "normal"
    ) {
        return <>{EmotionToImg[emotion]}</>;
    }
    return <>{EmotionToImg["normal"]}</>;
};

export default function useEmotion(emotion: string, nickname?: string) {
    const emotionState = useCallback(() => {
        if (
            emotion === "신남" ||
            emotion === "자신감" ||
            emotion === "만족감" ||
            emotion === "편안함"
        ) {
            return (
                <Message>
                    <span className="text">
                        이 날의 감정은 <strong className="emotionText">{emotion}</strong> 입니다.{" "}
                        <br />
                        {nickname}님, 행복한 하루를 보내셨네요.
                        <br /> 앞으로도 웃을 일만 가득할 거예요! <br />
                        오늘도 좋은 하루 보내세요 :)
                    </span>
                    {EmotionToImg[emotion]}
                </Message>
            );
        }

        if (emotion === "슬픔" || emotion === "불안" || emotion === "상처" || emotion === "분노") {
            return (
                <Message>
                    <span className="text">
                        이 날의 감정은 <strong className="emotionText">{emotion}</strong> 입니다.{" "}
                        <br />
                        {nickname}님, 너무 속상해 하지 마세요.
                        <br /> 내일은 분명 좋은 일이 있을 거예요! <br />
                        웃으면 복이 옵니다 :)
                    </span>
                    {EmotionToImg[emotion]}
                </Message>
            );
        }

        return (
            <Message>
                <span className="text">
                    {nickname}님, 아직 작성된 글이 없습니다.
                    <br />
                    어떤 하루를 보냈는지 기록해 보세요!
                </span>
                <img src={none} alt="happy" className="emotionIcon" />
            </Message>
        );
    }, [emotion]);
    return { emotionState };
}
