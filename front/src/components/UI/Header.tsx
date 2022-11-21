import styled from "styled-components";
import { useState } from "react";
import UserLoginForm from "../user/UserLogin";
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
            <nav>
                <ul>
                    <li>
                        <button onClick={() => setShowForm(true)}>로그인</button>
                    </li>
                </ul>
            </nav>
        </>
    );
}
