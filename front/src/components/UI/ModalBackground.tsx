import styled from "styled-components";

function ModalBackground({ setShowForm }: any) {
    return <ModalBackgroundStyle onClick={() => setShowForm(false)}></ModalBackgroundStyle>;
}

const ModalBackgroundStyle = styled.div`
    position: fixed;
    height: 100%;
    width: 100%;
    top: 0;
    left: 0;
    z-index: 10;
    background-color: rgba(153, 153, 153, 1);
`;

export default ModalBackground;
