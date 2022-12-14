import styled from "styled-components";

export const FooterStyle = styled.footer<{ formState: boolean }>`
    display: ${({ formState }) => (formState ? "none" : "flex")};
    flex-direction: column;
    justify-content: center;
    align-items: center;

    width: 100%;
    padding: 1rem 0;
    overflow: hidden;

    background-color: lightgray;
`;

export const Icons = styled.div`
    height: 100%;
    width: 100%;

    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`;

export const Left = styled.div`
    margin-left: 6rem;
`;

export const Right = styled.div`
    margin-right: 6rem;

    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;

    div {
        &:not(:last-of-type) {
            margin-right: 0.5rem;
        }
    }
`;

export const Copyright = styled.div`
    font-size: 0.8rem;
    font-weight: bold;
`;
