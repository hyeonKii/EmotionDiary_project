import styled from "styled-components";

export const DiarySection = styled.section`
    height: 100%;
    min-height: 100vh;
    padding: 70px 0;
`;

export const ButtonStyle = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;

    margin-top: 5rem;

    div {
        display: flex;
        flex-direction: row;

        button {
            font-size: 1rem;
            margin-right: 1rem;
        }
    }
`;

export const SelectStyle = styled.select`
    padding: 0.5rem;

    background-color: white;
    border: 1px solid black;
`;

export const MiscButtonsStyle = styled.div`
    * {
        margin-left: 0.5rem;
    }
`;
