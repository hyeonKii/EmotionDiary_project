import { IntroSection1, RightSection, LeftSection } from "@/styles/intro/introduce-style";
import bookpng from "@/assets/images/introduce_book.jpg";

export default function Main() {
    return (
        <IntroSection1>
            <LeftSection>
                <h1> 하루 한줄 마음 기록하기</h1>
                <p>마음 일기는 하루 하루 자신의 감정을 기록하고</p>
                <p>사람들과 마음을 나눌 수 있는 서비스 입니다.</p>
            </LeftSection>
            <RightSection>
                <img src={bookpng} alt="diary" />
            </RightSection>
        </IntroSection1>
    );
}
