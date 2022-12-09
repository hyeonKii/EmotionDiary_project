import styled from "styled-components";

export const Wrapper = styled.section`
    background: ${(isDark) => isDark.theme.bgColor};
    transition: background-color 0.5s linear;
`;
