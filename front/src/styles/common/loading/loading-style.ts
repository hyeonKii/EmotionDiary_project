import styled from "styled-components";
import { color } from "@/styles/common/colorPalette";

export const LoadingStyle = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;

    width: 100%;
    height: 100vh;

    background: ${color.white};
`;
