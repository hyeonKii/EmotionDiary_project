import { HomeSection, TitleBlock, Input } from "@/styles/home/home-style";

export default function Main() {
    return (
        <HomeSection>
            <TitleBlock>
                <h1>마음일기</h1>
                <p>하루 한 줄 마음 기록하기</p>
            </TitleBlock>
            <Input
                type="text"
                placeholder="오늘은 어떤 하루를 보내셨나요? 닉네임님의 오늘 마음을 기록해 보세요!"
                autoFocus
                onClick={() => alert("모달 띄움")}
            />
        </HomeSection>
    );
}
