import styled from "styled-components";
import { color } from "../common/colorPalette";

export const TabBlock = styled.ul`
    width: 70%;
    max-width: 800;

    display: flex;

    margin: 0 auto;
    padding: 1rem;

    li {
        margin-right: 1rem;
        list-style: none;

        color: ${color.gray};

        cursor: pointer;

        &.active {
            color: black;
            font-weight: 700;

            border-bottom: 3px solid ${color.lightBlue};
        }
    }
`;

export const PostItemBlock = styled.div`
    width: 100vw;
`;

export const CardBlock = styled.div`
    width: 70%;
    max-width: 800;

    position: relative;

    margin: 1rem auto;
    padding: 1.5rem 2rem;

    border: none;
    border-radius: 8px;

    box-shadow: 0 4px 4px 0 ${color.gray};
`;

export const CloseBlock = styled.div<{ isOpen: boolean; tag: string }>`
    display: flex;

    .tag {
        max-width: 120px;
        height: 40px;

        flex: 0.8;

        color: white;
        text-align: center;
        line-height: 40px;

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
    }

    .body {
        height: 40px;

        flex: 2;
        line-height: 40px;

        overflow: hidden;
    }

    .time {
        padding-right: 1.2rem;

        font-size: 0.8rem;
        line-height: 40px;

        .arrow {
            margin-left: 10px;
            color: gray;
        }
    }
`;

export const OpenBlock = styled.div`
    display: flex;
    position: relative;

    margin-top: 1rem;

    input {
        width: 100%;
        height: 35px;

        padding-left: 1.5rem;

        border: 1px solid gray;
        border-radius: 8px;
        outline: none;
    }

    button {
        width: 70px;
        height: 100%;

        position: absolute;
        right: 0;

        color: white;

        border: 1px solid ${color.lightBlue};
        border-radius: 0 8px 8px 0;
        background: ${color.lightBlue};

        cursor: pointer;
    }
`;
