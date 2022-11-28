import useLogout from "@/hooks/useLogout";
import { useState } from "react";
import styled from "styled-components";
import UserEdit from "../user/UserEdit";
import ModalBackground from "./ModalBackground";

interface Props {
    setShowDropDown(value: boolean): void;
}

interface Error {
    message: string;
}

export default function ProfileDropDown({ setShowDropDown }: Props) {
    const [showInfo, setShowInfo] = useState(false);

    const { logout } = useLogout();

    const logoutHandler = () => {
        try {
            logout();
            setShowDropDown(false);
        } catch (error) {
            if (error instanceof Error) {
                console.log(error.message);
            }
        }
    };

    return (
        <>
            {showInfo && (
                <>
                    <UserEdit setShowInfo={setShowInfo} setShowDropDown={setShowDropDown} />
                    <ModalBackground setShowLoginForm={setShowDropDown} />
                </>
            )}
            <DropDownStyle>
                <li>
                    <button onClick={() => setShowInfo(true)}>정보</button>
                </li>
                <li>
                    <button onClick={logoutHandler}>로그아웃</button>
                </li>
            </DropDownStyle>
        </>
    );
}
const DropDownStyle = styled.ul`
    width: 8rem;
    height: 5rem;

    margin-top: 1rem;
    padding: 1rem;

    list-style: none;

    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;

    position: absolute;
    top: 4vh;
    right: 0rem;

    background-color: white;

    button {
        background-color: transparent;
        border: none;
        font-size: 1.25rem;
    }
`;
