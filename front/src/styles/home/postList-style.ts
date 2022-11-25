import styled, { css } from "styled-components";
import { color } from "../common/colorPalette";

export const TabBlock = styled.ul`
    display: flex;

    width: 70%;
    max-width: 800;
    margin: 1rem auto;
    padding: 1rem;

    li {
        list-style: none;

        margin-right: 1rem;

        color: ${color.gray};
        cursor: pointer;

        &.active {
            border-bottom: 3px solid ${color.lightBlue};

            color: black;
            font-weight: 700;
        }
    }
`;

export const CardBlock = styled.section`
    position: relative;

    width: 70%;
    max-width: 800;
    margin: 1.5rem auto;
    padding: 1.5rem 2rem;

    border: none;
    border-radius: 8px;
    box-shadow: 0 4px 4px 0 ${color.gray};
`;

export const CloseBlock = styled.article<{ isOpen: boolean; tag: string }>`
    display: flex;

    .tag {
        flex: 0.8;

        max-width: 120px;
        height: 40px;
        margin-right: 1.5rem;

        background: ${({ tag }) =>
            tag === "행복"
                ? color.yellow
                : tag === "슬픔"
                ? color.deepBlue
                : tag === "분노"
                ? color.red
                : tag === "경멸"
                ? color.orange
                : tag === "두려움"
                ? color.darkBlue
                : color.pink};

        color: white;
        line-height: 40px;
        text-align: center;
    }

    .body {
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

export const OpenBlock = styled.article`
    display: flex;
    position: relative;

    margin-top: 2rem;

    input {
        width: 100%;
        height: 35px;
        padding-left: 1.5rem;

        border: 1px solid gray;
        border-radius: 8px;
        outline: none;
    }

    button {
        position: absolute;
        right: 0;

        width: 70px;
        height: 100%;

        border: 1px solid ${color.lightBlue};
        border-radius: 0 8px 8px 0;
        background: ${color.lightBlue};

        color: white;

        cursor: pointer;
    }
`;
