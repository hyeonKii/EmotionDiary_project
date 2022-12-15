import styled from "styled-components";

export const Wrapper = styled.section`
    overflow-x: hidden;
    background: ${(isDark) => isDark.theme.homeBgColor};
`;
