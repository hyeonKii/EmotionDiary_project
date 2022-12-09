import { useState } from "react";
import { useNavigate } from "react-router-dom";

import useLogout from "@/hooks/useLogout";
import UserEdit from "@/components/user/UserEdit";
import ModalBackground from "./ModalBackground";
import { DropDownStyle } from "@/styles/common/nav/nav-style";

interface Props {
    setShowDropDown(value: boolean): void;
}

interface Error {
    message: string;
}

export default function ProfileDropDown({ setShowDropDown }: Props) {
    const navigate = useNavigate();
    const [showInfo, setShowInfo] = useState(false);

    const { logout } = useLogout();

    const logoutHandler = () => {
        try {
            setShowDropDown(false);
            logout();
            navigate("/home");
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
