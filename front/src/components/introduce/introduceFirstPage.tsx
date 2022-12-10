import { HomeSection1, RightSection, LeftSection, Bookimg } from "@/styles/home/introduce-style";

export default function Main() {
    return (
        <HomeSection1>
            <LeftSection>
                <div>
                    <h1> 하루 한줄 마음 기록하기</h1>
                    <br></br>
                    <p>마음 일기는 하루 하루 자신의 감정을 기록하고</p>
                    <p>사람들과 마음을 나눌 수 있는 서비스 입니다.</p>
                </div>
            </LeftSection>
            <RightSection>
                <Bookimg />
            </RightSection>
        </HomeSection1>
    );
}
