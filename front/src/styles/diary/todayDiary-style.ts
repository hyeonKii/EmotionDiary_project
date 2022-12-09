import styled from "styled-components";
import "react-calendar/dist/Calendar.css";
import { color } from "@/styles/common/colorPalette";

export const TodaySection = styled.section`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;

    width: 70%;
    max-width: 800;
    margin: 0 auto;
    margin-top: 1rem;

    .react-calendar {
        width: 48%;
        min-width: 450px;
        padding: 3%;

        border: 0;
        box-shadow: 0 4px 4px 0 ${color.gray};

        abbr {
            color: ${color.gray};
        }

        .react-calendar__navigation {
            height: 70px;
            .react-calendar__navigation__label {
                font-size: 1.2rem;
            }
        }

        .react-calendar__tile {
            padding: 5%;
            font-size: 1rem;
        }

        // 감정 스타일 예시
        .react-calendar__tile.normal {
            background: ${color.lightGray};
            border-radius: 50%;
        }

        .react-calendar__tile--now {
            border-radius: 50%;
            background: none;
            abbr {
                color: ${color.lightBlue};
            }
        }

        .react-calendar__tile--active {
            border-radius: 50%;
            background: ${color.lightGray};

            &:hover,
            &:focus {
                background: ${color.lightGray};
            }

            abbr {
                color: white;
            }
        }
    }
`;

export const CalendarDetail = styled.div`
    display: flex;
    flex-direction: column;

    width: 48%;
    min-width: 450px;
    text-align: center;
`;

export const Message = styled.div`
    display: flex;
    flex-wrap: wrap;
    align-items: center;

    padding: 2rem;

    .text {
        flex: 1;
        margin-right: 1rem;
        color: ${(isDark) => isDark.theme.textColor};
        transition: color 0.5s linear;

        .emotionText {
            color: ${color.lightBlue};
            font-size: 1.3rem;
        }
    }

    .emotionIcon {
        font-size: 6rem;
    }
`;

export const DiaryDetail = styled.div<{ isEdit: boolean }>`
    flex: 1;
    position: relative;

    padding: 2rem 3rem;

    background: white;
    text-align: start;

    .top {
        display: flex;
        justify-content: space-between;

        margin-bottom: 1.5rem;

        .icons {
            display: ${({ isEdit }) => (isEdit ? "none" : "block")};

            .material-symbols-outlined:not(:last-child) {
                margin-right: 1rem;
            }
        }

        select {
            display: ${({ isEdit }) => (isEdit ? "block" : "none")};
            outline: 0;
        }
    }

    .description {
        width: 100%;
        padding-top: 0.5rem;
        resize: none;

        border: 0;
        outline: 0;

        word-break: break-all;
    }
`;

export const EditBlock = styled.div`
    .title {
        width: 100%;
        padding-bottom: 0.5rem;

        border: 0;
        outline: 0;
        border-bottom: 1px solid ${color.lightGray};
    }

    div {
        position: absolute;
        right: 30px;
        bottom: 20px;

        .countText {
            color: ${color.gray};
            font-size: 0.8rem;
        }

        .maxText {
            color: ${color.red};
            font-size: 0.8rem;
        }

        .submitButton {
            width: 120px;
            height: 45px;
            margin-left: 1rem;
            border-radius: 16px;

            background: ${color.lightBlue};
            color: white;

            &:disabled {
                background: ${color.lightGray};
            }
        }
    }
`;

export const ReadBlock = styled.div`
    .title {
        padding-bottom: 0.5rem;
        border-bottom: 1px solid ${color.lightGray};
    }

    .description {
        padding-top: 0.5rem;
    }
`;
