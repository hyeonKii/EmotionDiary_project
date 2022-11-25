import styled from "styled-components";
import { color } from "@/styles/common/colorPalette";
import background from "@/assets/images/background.jpg";
import backgroundDark from "@/assets/images/background_dark.jpg";

export const HomeSection = styled.section`
    width: 100vw;
    height: 100vh;

    background-image: url(${background});
    background-size: cover;
`;

export const TitleBlock = styled.div`
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
