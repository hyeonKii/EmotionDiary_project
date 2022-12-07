import styled, { css } from "styled-components";
import { color } from "@/styles/common/colorPalette";

export const CardSection = styled.section`
    position: relative;

    width: 70%;
    max-width: 800;
    margin: 2rem auto;
    padding: 1.5rem 2rem;

    border: none;
    border-radius: 8px;
    background: ${color.white};
    box-shadow: 0 4px 4px 0 ${color.gray};
`;

export const Post = styled.article<{ isOpen: boolean; emotion: string }>`
    display: flex;

    .emotion {
        flex: 0.8;

        max-width: 120px;
        height: 40px;
        margin-right: 1.5rem;

        background: ${({ emotion }) =>
            emotion === "자신감"
                ? color.orange
                : emotion === "만족감"
                ? color.pink
                : emotion === "편안함"
                ? color.skyBlue
                : emotion === "신남"
                ? color.yellow
                : emotion === "불안"
                ? color.green
                : emotion === "슬픔"
                ? color.lightBlue
                : emotion === "상처"
                ? color.deepBlue
                : emotion === "분노"
                ? color.red
                : color.lightGray};

        color: white;
        line-height: 40px;
        text-align: center;
    }

    .title {
        flex: 2;
        overflow: hidden;

        height: 40px;
        margin-top: 8px;
        margin-right: 1.5rem;

        white-space: nowrap;
        text-overflow: ellipsis;

        ${({ isOpen }) =>
            isOpen &&
            css`
                height: 100%;
                white-space: normal;
            `}
    }

    .time {
        font-size: 0.8rem;
        line-height: 40px;

        .arrow {
            margin-left: 10px;

            color: gray;
        }
    }
`;

export const PostDetail = styled.article`
    position: relative;

    .description {
        margin: 1.5rem 0;
        word-break: break-all;
    }

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
`;

export const MessageBlock = styled.div`
    position: relative;

    width: 95%;

    input {
        width: 100%;
        height: 35px;
        padding-left: 1.5rem;

        border: 1px solid gray;
        border-radius: 8px;
        outline: none;
    }

    .submitButton {
        position: absolute;
        right: 0;

        width: 70px;
        height: 35px;

        border: 1px solid ${color.lightBlue};
        border-radius: 0 8px 8px 0;
        background: ${color.lightBlue};

        color: white;
    }
`;
