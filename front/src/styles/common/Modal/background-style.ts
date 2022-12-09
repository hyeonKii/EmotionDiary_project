import styled from "styled-components";

export const ModalBackgroundStyle = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    z-index: 10;

    height: 100vh;
    width: 100%;

    background: rgba(0, 0, 0, 0.8);
    backdrop-filter: blur(5px);
`;
