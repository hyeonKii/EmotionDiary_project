import styled from "styled-components";
import { color } from "../common/colorPalette";

export const TabList = styled.ul`
    display: flex;

    width: 70%;
    max-width: 800;
    margin: 0 auto;
    padding: 2rem 0;

    white-space: nowrap;

    li {
        list-style: none;

        margin-right: 1rem;
        padding: 0.3rem;

        color: ${(isdark) => isdark.theme.textColor};
        transition: color 0.2s linear;

        cursor: pointer;

        &.active {
            border-bottom: 3px solid ${color.lightBlue};

            color: ${(isdark) => isdark.theme.textColor};
            font-weight: 700;
        }
    }
`;
