import styled from "styled-components";
import { color } from "@/styles/common/colorPalette";

export const EmotionSection = styled.section`
    padding: 3rem 0;

    h1 {
        margin-top: 1rem;
        font-size: 2rem;
        text-align: center;

        span {
            color: ${color.lightBlue};
        }
    }
`;

export const EmotionChartSection = styled.section`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    align-items: center;

    width: 70%;
    max-width: 800;
    margin: 0 auto;

    span {
        font-size: 1.4rem;
        text-align: center;
        line-height: 40px;

        strong {
            color: ${color.lightBlue};
        }
    }
`;

export const EmotionDataSection = styled.section`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;

    width: 70%;
    max-width: 800;
    margin: 0 auto;

    text-align: center;

    article {
        display: flex;
        flex-direction: column;
        justify-content: space-between;

        width: 25%;
        height: 300px;
        padding: 2rem;

        border-radius: 32px;
        background: white;
        box-shadow: 0 4px 4px 0 ${color.gray};

        .emotionIcon {
            font-size: 5rem;
        }

        .body {
            color: ${color.gray};
        }
    }
`;
