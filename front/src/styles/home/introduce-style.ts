import styled from "styled-components";
import { color } from "@/styles/common/colorPalette";
import bookpng from "@/assets/images/introduce_book.jpg";

export const HomeBlock = styled.section`
    width: 100vw;
    height: 100vh;

    background-size: cover;
`;
/* background-image: url(${background}); */

export const HomeSection1 = styled.section`
    width: 100vw;
    height: 100vh;
    background: #fcf8e8;
    background-size: cover;
    display: flex;
`;

export const RightSection = styled.section`
    display: flex;
    align-items: center;
    justify-content: center;
`;
export const LeftSection = styled.section`
    width: 60vw;
    display: flex;
    height: 100vh;
    align-items: center;
    justify-content: center;
    h1 {
        font-size: 3.4vw;
        margin-left: 30px;
        margin-bottom: 20px;
    }
    p {
        font-size: 1.8vw;
        font-weight: bold;
    }
`;
export const CenterSection = styled.section`
    width: 75vw;
    height: 100vh;
    text-align: center;
    h1 {
        font-size: 3.4vw;
        margin-left: 25px;
        margin: 50px 0px;
    }
    p:first-child {
        font-size: 2.5vw;
        font-weight: bold;
        b {
            color: #26ade8;
            font-size: 3.4vw;
        }
        margin: 30px 0px;
    }
    p {
        font-size: 1.8vw;
        b {
            color: #26ade8;
            font-size: 3.4vw;
        }
    }
    div {
        text-align: left;
        margin-bottom: 50px;
    }
`;

export const HomeSection2 = styled.section`
    width: 100vw;
    height: 100vh;
    background-size: cover;
    display: flex;
    align-items: center;
    justify-content: center;
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

export const Bookimg = styled.img.attrs({
    src: bookpng,
    alt: "introduce_book",
})`
    width: 40vw;
    height: 50vh;
`;
