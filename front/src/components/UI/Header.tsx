import styled from "styled-components";
import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ROUTES_LIST } from "@/routes/route";
import ModalBackground from "./ModalBackground";

export default function Header() {
    const [showForm, setShowForm] = useState<boolean>(false);

    return (
        <>
            {showForm && (
                <>
                    {/* <UserLoginForm /> */}
                    <Routes>
                        {ROUTES_LIST.map(({ path, Component }, idx) => (
                            <Route key={idx} path={path} element={<Component />} />
                        ))}
                    </Routes>
                    <ModalBackground setShowForm={setShowForm} />
                </>
            )}
            <HeaderStyle>
                <ul>
                    <li>
                        <button onClick={() => setShowForm(true)}>로그인</button>
                    </li>
                </ul>
            </HeaderStyle>
        </>
    );
}

const HeaderStyle = styled.nav`
    width: 100%;
    height: 10vh;

    ul {
        list-style: none;
    }

    ul button {
        cursor: pointer;
    }
`;
