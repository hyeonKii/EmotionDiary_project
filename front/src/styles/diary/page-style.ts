import styled from "styled-components";
import { color } from "@/styles/common/colorPalette";

export const Wrapper = styled.section`
    background: ${isDark => isDark.theme.bgColor};
    transition: background-color 0.5s linear;
`;
