import styled from "styled-components";
import { color } from "../common/colorPalette";

export const TabList = styled.ul`
    display: flex;

    width: 70%;
    max-width: 800;
    margin: 0 auto;
    padding: 2rem 0;

    li {
        list-style: none;

        margin-right: 1rem;
        padding: 0.3rem;

        color: ${color.gray};
        cursor: pointer;

        &.active {
            border-bottom: 3px solid ${color.lightBlue};

            color: black;
            font-weight: 700;
        }
    }
`;
