import styled from "styled-components";

export const Wrapper = styled.section`
    overflow-x: hidden;
    background: ${(isDark) => isDark.theme.homeBgColor};
`;

export const Main = styled.main`
    height: 100%;
    width: 100%;
    position: absolute;
    z-index: 0;
    left: 0;
    transition: all 0.7s;
`;
