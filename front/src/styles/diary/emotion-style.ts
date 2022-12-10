import styled from "styled-components";
import { color } from "@/styles/common/colorPalette";

export const EmotionSection = styled.section``;

export const EmotionChartSection = styled.section`
    width: 80%;
    max-width: 800;
    height: 100%;
    min-height: calc(100vh - 65px);
    margin: 0 auto;
    padding: 3rem 0;

    h1 {
        color: ${(isDark) => isDark.theme.textColor};
        font-size: 2.5rem;
        text-align: center;

        transition: color 0.5s linear;

        .nickName {
            color: ${color.lightBlue};
        }
    }

    .description {
        font-size: 1.5rem;
        text-align: center;
        line-height: 45px;
        color: ${(isDark) => isDark.theme.textColor};
        transition: color 0.5s linear;

        strong {
            color: ${color.lightBlue};
        }
    }
`;

export const ChartBlock = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    align-items: center;

    padding-top: 1.5rem;
`;

export const EmotionDataSection = styled.section`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    align-items: center;

    width: 90%;
    max-width: 800;
    height: 100%;
    min-height: calc(100vh - 65px);
    margin: 0 auto;
    padding: 2rem 0;
    text-align: center;

    article {
        display: flex;
        flex-direction: column;

        width: 25%;
        min-width: 400px;
        height: 400px;
        padding: 2rem;

        border-radius: 32px;
        background: white;
        box-shadow: 0 4px 4px 0 ${color.gray};

        h3 {
            font-size: 1.5rem;
        }

        .emotionIcon {
            width: 60%;
            margin: 0 auto;
            padding: 0.5rem 0;
        }

        .date {
            font-weight: 700;
        }

        .diary {
            display: flex;
            flex-direction: column;
            justify-content: center;

            height: 100%;
            padding: 1rem 0;

            .body {
                overflow-y: auto;

                max-height: 100px;
                margin-top: 0.5rem;

                color: ${color.gray};
                white-space: normal;
                word-break: break-all;
                line-height: 20px;
            }
        }
    }
`;
