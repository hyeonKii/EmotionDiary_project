import styled from "styled-components";
import FooterIcon from "@/styles/footer/FooterIcon";

function Footer() {
    return (
        <FooterStyle>
            <Icons>
                <Left>
                    <FooterIcon icon="gitIcon" />
                </Left>
                <Right>
                    <FooterIcon icon="gitIcon1" />
                    <FooterIcon icon="gitIcon2" />
                    <FooterIcon icon="gitIcon3" />
                    <FooterIcon icon="gitIcon4" />
                    <FooterIcon icon="gitIcon5" />
                </Right>
            </Icons>
            <Copyright>Copyright 2022. team 투위터. all rights reserved.</Copyright>
        </FooterStyle>
    );
}

export default Footer;

const FooterStyle = styled.footer`
    width: 100%;
    padding: 1rem 0;

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
    font-size: 0.8rem;
    font-weight: bold;
`;
