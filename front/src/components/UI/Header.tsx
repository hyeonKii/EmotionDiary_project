import styled from "styled-components";
import { useState } from "react";
import UserLoginForm from "../user/UserLoginForm";
import ModalBackground from "./ModalBackground";

export default function Header() {
    const [showForm, setShowForm] = useState<boolean>(false);

    return (
        <>
            {showForm && (
                <>
                    <UserLoginForm />
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
