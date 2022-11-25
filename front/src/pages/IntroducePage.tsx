import { Wrapper, Main } from "@/styles/home/page-style";
import IntroduceFirstPage from "@/components/introduce/introduceFirstPage";
import IntroduceSecondPage from "@/components/introduce/introduceSecondPage";
const introduce = () => {
    return (
        <>
            <Wrapper>
                <Main>
                    <IntroduceFirstPage />
                    <IntroduceSecondPage />
                </Main>
            </Wrapper>
        </>
    );
};

export default introduce;
