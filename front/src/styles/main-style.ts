import styled from "styled-components";

export const MainBlock = styled.div`
    width: 100vw;
    height: 100vh;

    /* background-image: url("../assets/images/background.jpg"); */
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

export const InputBlock = styled.input`
    width: 70%;
    max-width: 800;
    height: 60px;
    line-height: 50px;

    position: absolute;
    top: 60%;
    left: 50%;
    transform: translate(-50%, -60%);

    padding-left: 2rem;

    border: none;
    border-radius: 32px;
    outline: none;

    box-shadow: 0 4px 4px 0 gray;
`;
