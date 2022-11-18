import styled from "styled-components";

export default function ModalBackground({ setShowForm }) {
    return <ModalBackgroundStyle onClick={() => setShowForm(false)}></ModalBackgroundStyle>;
}

const ModalBackgroundStyle = styled.div`
    position: fixed;
    height: 100%;
    width: 100%;
    top: 0;
    left: 0;
    z-index: 10;
    background-color: rgba(0, 0, 0, 0.8);
`;
