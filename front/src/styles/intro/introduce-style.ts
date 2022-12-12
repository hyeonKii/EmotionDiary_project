import styled from "styled-components";
import { color } from "@/styles/common/colorPalette";

export const HomeBlock = styled.section`
    width: 100vw;
    height: 100vh;

    background-size: cover;
`;

export const IntroSection1 = styled.section`
    display: flex;
    flex-wrap: wrap;

    width: 100%;
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

export const Input = styled.input`
    position: absolute;
    top: 60%;
    left: 50%;
    transform: translate(-50%, -60%);

    width: 70%;
    max-width: 800;
    height: 60px;
    padding-left: 2rem;

    border: none;
    border-radius: 32px;
    outline: none;
    box-shadow: 0 4px 4px 0 ${color.gray};

    line-height: 60px;
`;

export const TitleBlock = styled.article`
    position: absolute;
    top: 35%;
    left: 50%;
    transform: translate(-50%, -35%);

    text-align: center;

    h1 {
        margin-bottom: 1rem;

        font-family: "diary";
        font-size: 4rem;
    }
`;

export const InputBlock = styled.input`
    position: absolute;
    top: 60%;
    left: 50%;
    transform: translate(-50%, -60%);

    width: 70%;
    max-width: 800;
    height: 60px;
    padding-left: 2rem;

    border: none;
    border-radius: 32px;
    outline: none;
    box-shadow: 0 4px 4px 0 ${color.gray};

    line-height: 60px;
`;
