import { Diary } from "@/components/diary/Diary";
import { Emotion } from "@/components/diary/Emotion";
import { Wrapper } from "@/styles/diary/page-style";

export default function DiaryPage() {
    return (
        <Wrapper>
            <Diary />
            <Emotion />
        </Wrapper>
    );
}
