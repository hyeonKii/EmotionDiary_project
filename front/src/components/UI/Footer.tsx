import { useRecoilValue } from "recoil";

import { showLoginForm } from "@/temp/formAtom";
import { Copyright, FooterStyle, Icons, Left, Right } from "@/styles/footer/footer-style";
import FooterIcon from "@/styles/footer/FooterIcon";

export default function Footer() {
    const formState = useRecoilValue(showLoginForm);

    return (
        <FooterStyle formState={formState}>
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
