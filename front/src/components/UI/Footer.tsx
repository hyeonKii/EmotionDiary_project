import styled from "styled-components";

function Footer() {
    return (
        <FooterStyle>
            <Icons>
                <Left>아이콘</Left>
                <Right>
                    <div>아이콘</div>
                    <div>아이콘</div>
                    <div>아이콘</div>
                    <div>아이콘</div>
                    <div>아이콘</div>
                </Right>
            </Icons>
            <Copyright>Copyright~</Copyright>
        </FooterStyle>
    );
}

export default Footer;

const FooterStyle = styled.footer`
    width: 100%;
    height: 15vh;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    background-color: lightgray;
`;

const Icons = styled.div`
    height: 100%;
    width: 100%;

    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`;

const Left = styled.div`
    margin-left: 6rem;
`;

const Right = styled.div`
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

const Copyright = styled.div`
    height: 33%;
`;
