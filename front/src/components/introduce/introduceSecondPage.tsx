import { HomeSection2, CenterSection, Input } from "@/styles/home/introduce-style";

export default function Main() {
    return (
        <HomeSection2>
            <CenterSection>
                <h1>마음일기는 이런 기능을 제공해요!</h1>
                <br></br>
                <div>
                    <p>
                        <b>하나.</b> 일기를 쓰면 AI가 그 날의 감정을 분석해 줘요!
                    </p>
                    <p>
                        일기장 탭의 캘린더를 클릭해서 귀여운 7가지의 감정 이모티콘을 확인해 보세요
                        :)
                    </p>

                    <p>
                        지난 한 달간의 감정 결과와 일주일, 한 달, 일년 전 오늘의 내 감정도 확인할 수
                        있어요.
                    </p>
                </div>
                <div>
                    <p>
                        <b>둘.</b>다른 사람들과 감정을 공유할 수 있어요!
                    </p>
                    <p>전체 공개 글로 게시물을 작성하면 다른 사람들도 글을 볼 수 있어요.</p>
                    <p>마음이맞는 사람과 대화 하면서 속마음을 털어놔 보세요!</p>
                </div>
                <div>
                    <p>
                        <b>셋.</b>익명성을 보장해요!
                    </p>
                    <p>
                        글을 공유해도 익명으로 공개되기 때문에 속 시원하게 마음을 털어놔도 괜찮아요
                        !
                    </p>
                    <p>나만 보기로 글을 작성하면 다른 사람들과 공유되지 않아요.</p>
                </div>
            </CenterSection>
        </HomeSection2>
    );
}
