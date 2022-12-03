import styled from "styled-components";
import { useState } from "react";
import ProfileDropDown from "./ProfileDropDown";
import { useRecoilValue } from "recoil";
import { currentUser } from "@/temp/userAtom";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ROUTES_LIST } from "@/routes/route";

export default function Header() {
    const user = useRecoilValue(currentUser);

    const [showLoginForm, setShowLoginForm] = useState(false);
    const [showDropDown, setShowDropDown] = useState(false);

    return (
        <header>
            {showLoginForm && (
                <Routes>
                    {ROUTES_LIST.map(({ path, Component }, idx) => (
                        <Route key={idx} path={path} element={<Component />} />
                    ))}
                </Routes>
            )}
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
                            <button>다크 모드 아이콘</button>
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
            {showDropDown && <ProfileDropDown />}
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

    box-shadow: 0 6px 6px -6px gray;

    div {
        margin-left: 3rem;
        font-family: diary;
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

        background-color: transparent;
        border: none;
    }
`;
