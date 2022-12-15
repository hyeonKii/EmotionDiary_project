import { Diary } from "@/components/diary/Diary";
import { Emotion } from "@/components/diary/Emotion";
import { Wrapper } from "@/styles/diary/page-style";
import { currentUser } from "@/temp/userAtom";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";

export default function DiaryPage() {
    const user = useRecoilValue(currentUser);
    const navigate = useNavigate();

    useEffect(() => {
        if (!user) {
            navigate("/home");
        }
    }, []);

    return (
        <Wrapper>
            <Diary />
            <Emotion />
        </Wrapper>
    );
}
