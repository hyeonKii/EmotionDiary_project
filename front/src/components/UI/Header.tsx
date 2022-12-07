import styled from "styled-components";
import { useState } from "react";
import ProfileDropDown from "./ProfileDropDown";
import { useRecoilValue } from "recoil";
import { currentUser } from "@/temp/userAtom";
import UserFormController from "../user/UserFormController";
import ModalBackground from "./ModalBackground";
import DarkModeToggle from "@/styles/common/DarkModeToggle";

export default function Header() {
    const user = useRecoilValue(currentUser);
    const userCheck = user ? false : true;

    const [showLoginForm, setShowLoginForm] = useState(userCheck);
    const [showDropDown, setShowDropDown] = useState(false);

    return (
        <header>
            {showLoginForm && (
                <>
                    <UserFormController setShowLoginForm={setShowLoginForm} />
                    <ModalBackground />
                </>
            )}
            {showDropDown && <ProfileDropDown setShowDropDown={setShowDropDown} />}
            <NavStyle>
                <div>마음일기</div>
                {!user ? (
                    <ul>
                        <li>
                            <button onClick={() => setShowLoginForm(true)}>로그인</button>
                        </li>
                    </ul>
                ) : (
                    <ul>
                        <li>
                            <DarkModeToggle />
                        </li>
                        <li>
                            <button>소개</button>
                        </li>
                        <li>
                            <button>일기장</button>
                        </li>
                        <li>
                            <button onClick={() => setShowDropDown((prevState) => !prevState)}>
                                {user.nickname[0]}
                            </button>
                        </li>
                    </ul>
                )}
            </NavStyle>
        </header>
    );
}

const NavStyle = styled.nav`
    width: 100%;
    height: 6vh;

    font-size: 2rem;

    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    background-color: ${isdark => isdark.theme.navColor};
    transition: background-color 0.5s linear;
    box-shadow: 0 6px 6px -6px gray;

    div {
        margin-left: 3rem;
        font-family: diary;
        color: ${isdark => isdark.theme.textColor};
        transition: color 0.5s linear;
    }

    ul {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;

        margin-right: 3rem;
        list-style: none;
    }

    li {
        &:not(:last-of-type) {
            margin-right: 2rem;
        }
    }

    button {
        font-size: 1.5rem;
        color: ${isdark => isdark.theme.textColor};
        transition: color 0.5s linear;
        background-color: transparent;
        border: none;
    }
`;
