import styled, { css } from "styled-components";

export const Wrapper = styled.section<{ formState: boolean }>`
    overflow-x: hidden;

    ${({ formState }) =>
        formState &&
        css`
            overflow: hidden;
            height: 100vh;
        `}
    background: ${(isDark) => isDark.theme.homeBgColor};
`;
