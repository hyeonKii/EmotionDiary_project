import styled from "styled-components";

export const Empty = styled.section`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    width: 100%;
    padding: 3rem 0;

    color: ${(isdark) => isdark.theme.textColor};

    img {
        width: 20%;
        max-width: 150px;
        margin-bottom: 1rem;
    }
`;

export const LoadingStyle = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;

    img {
        width: 50px;
    }
`;
