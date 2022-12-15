import { useEffect, useRef, useState } from "react";

import IntroduceFirstPage from "@/components/introduce/introduceFirstPage";
import IntroduceSecondPage from "@/components/introduce/introduceSecondPage";
import { Main } from "@/styles/intro/page-style";

const introduce = () => {

    return (
        
            <Main>
                <IntroduceFirstPage />            
                <IntroduceSecondPage />
            </Main>
    );

};

export default introduce;
