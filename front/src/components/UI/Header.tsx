import { useState } from "react";
import { useRecoilValue } from "recoil";

import { currentUser } from "@/temp/userAtom";

import ProfileDropDown from "./ProfileDropDown";
import ModalBackground from "./ModalBackground";
import UserFormController from "@/components/user/UserFormController";
import { NavStyle, LinkStyle } from "@/styles/common/nav/nav-style";
import DarkModeToggle from "@/styles/common/DarkModeToggle";

export default function Header() {
    const user = useRecoilValue(currentUser);

    const [showLoginForm, setShowLoginForm] = useState(!user);
    const [showDropDown, setShowDropDown] = useState(false);

    return (
        <header>
            {showLoginForm && (
                <>
                    <UserFormController setShowLoginForm={setShowLoginForm} />
                    <ModalBackground />
                </>
            )}

            <NavStyle>
                <LinkStyle to="/home" className="logo">
                    마음일기
                </LinkStyle>
                {!user ? (
                    <button className="loginButton" onClick={() => setShowLoginForm(true)}>
                        로그인
                    </button>
                ) : (
                    <nav className="navList">
                        <DarkModeToggle />
                        <LinkStyle to="/intro">소개</LinkStyle>
                        <LinkStyle to="/diary">일기장</LinkStyle>
                        <button
                            className="nickButton"
                            onClick={() => setShowDropDown((prevState) => !prevState)}
                        >
                            {user.nickname[0]}
                        </button>
                    </nav>
                )}
                {showDropDown && <ProfileDropDown setShowDropDown={setShowDropDown} />}
            </NavStyle>
        </header>
    );
}
