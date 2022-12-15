import styled from "styled-components";
import { color } from "@/styles/common/colorPalette";

export const IntroSection1 = styled.section`
    display: flex;
    width: 100%;
    min-width: 1200px;
    height: 100vh;

    background: ${(isdark) => isdark.theme.bgColor};
    background-size: cover;
    transition: background 0.5s linear;
`;

export const LeftSection = styled.section`
    display: flex;
    flex: 1;
    flex-direction: column;
    justify-content: center;

    width: 50%;
    padding-left: 5rem;

    color: ${(isdark) => isdark.theme.textColor};
    transition: color 0.5s linear;

    h1 {
        margin-bottom: 20px;
        font-size: 3rem;
    }
    p {
        font-size: 1.5rem;
        font-weight: bold;
        line-height: 50px;
    }
`;

export const RightSection = styled.section`
    display: flex;
    align-items: center;
    justify-content: end;

    width: 50%;

    img {
        width: 40vw;
        height: 50vh;
    }
`;

export const IntroSection2 = styled.section`
    display: flex;
    align-items: center;
    justify-content: center;

    width: 100vw;
    min-width: 700px;
    height: 100vh;

    background: ${(isdark) => isdark.theme.bgColor};
    transition: background 0.5s linear;
`;

export const CenterSection = styled.section`
    color: ${(isdark) => isdark.theme.textColor};
    transition: color 0.5s linear;

    article {
        text-align: left;
        margin-bottom: 50px;
    }

    h1 {
        margin: 50px 0px;

        text-align: center;
        font-size: 2rem;
    }

    .title {
        font-size: 1.5rem;
        font-weight: bold;

        margin: 30px 0px;

        b {
            color: ${color.lightBlue};
            font-size: 1.6rem;
        }
    }

    .description {
        font-size: 1.1rem;
        line-height: 30px;
    }
`;
