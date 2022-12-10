import { ROUTES } from "@/routes/route";
import { useState } from "react";
import { Link } from "react-router-dom";
import UserEmailCheckTab from "./UserEmailCheckTab";
import UserRegisterTab from "./UserRegisterTab";

export default function UserRegister() {
    const [tab, setTab] = useState(false);

    return (
        <form>
            <div>{tab}</div>
            <div>회원가입</div>
            {!tab ? <UserEmailCheckTab setTab={setTab} /> : <UserRegisterTab />}
            <div>이미 계정이 있으신가요?</div>
            <Link
                to={ROUTES.LOGIN.path}
                style={{
                    textDecoration: "none",
                    color: "#47B5FF",
                }}
            >
                로그인
            </Link>
        </form>
    );
}
