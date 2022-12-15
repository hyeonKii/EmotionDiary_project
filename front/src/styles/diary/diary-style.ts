import styled from "styled-components";
import { color } from "../common/colorPalette";

export const DiarySection = styled.section`
    height: 100%;
    min-height: 100vh;
    padding: 70px 0;
`;

export const TodayDiaryDetail = styled.article`
    position: relative;

    div {
        display: flex;
        justify-content: space-between;

        .material-symbols-outlined {
            font-size: 2rem;
        }
        .material-icons {
            color: ${color.lightBlue};
            font-size: 2rem;
        }
    }

    .description {
        margin: 1.5rem 0;
        word-break: break-all;

        display: flex;
        justify-content: space-between;
    }

    textarea {
        width: 100%;
        padding-top: 0.5rem;
        resize: none;
        border: 0;
        outline: 0;
        word-break: break-all;
    }
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

export const SubmitButtonStyle = styled.button`
    width: 120px;
    height: 45px;
    margin-left: 1rem;
    border-radius: 16px;

    background: ${color.lightBlue};
    color: white;
`;

export const SelectStyle = styled.select`
    padding: 0.5rem;

    background-color: white;
    border: 1px solid black;
`;

export const EditPostButtonsStyle = styled.div`
    * {
        margin-left: 1rem;
    }
`;

export const MiscButtonsStyle = styled.div`
    * {
        margin-left: 0.5rem;
    }
`;
