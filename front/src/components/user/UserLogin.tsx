import { useRequestLogin } from "@/api/user";
import useForm from "@/hooks/useForm";
import { ROUTES } from "@/routes/route";
import axios from "axios";
import React, { useEffect } from "react";
import { QueryClient } from "react-query";
import { Link } from "react-router-dom";
import Icon from "../UI/Icon";

function UserLogin() {
    const queryClient = new QueryClient();

    const { form, changeHandler } = useForm({ userID: "", password: "" });

    const { mutate: login } = useRequestLogin(form, {
        onSuccess: (data) => {
            const { userID, nickname, email, accessToken, refreshToken } = data;

            queryClient.setQueryData(["user"], { userID, nickname, email });
            axios.defaults.headers.common["Authorization"] = accessToken;
            sessionStorage.setItem("refreshToken", refreshToken);
        },
        onError: (error) => {
            console.log(error.message);
        },
    });

    const loginUser = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        login();
    };

    return (
        <form onSubmit={loginUser}>
            <div>로그인</div>
            {/* <Icon icon="userID" /> */}
            <input type="text" id="userID" onChange={changeHandler} placeholder="아이디" />
            {/* <Icon icon="password" /> */}
            <input type="password" id="password" onChange={changeHandler} placeholder="비밀번호" />
            <button>로그인</button>
            <div>
                계정이 없으신가요? {""}
                <Link
                    to={ROUTES.REGISTER.path}
                    style={{
                        textDecoration: "none",
                        color: "#47B5FF",
                    }}
                >
                    회원가입
                </Link>
            </div>
            <div>
                <Link
                    to={ROUTES.FINDID.path}
                    style={{
                        textDecoration: "none",
                        color: "#47B5FF",
                    }}
                >
                    아이디
                </Link>
                {""} / {""}
                <Link
                    to={ROUTES.FINDPW.path}
                    style={{
                        textDecoration: "none",
                        color: "#47B5FF",
                    }}
                >
                    비밀번호 찾기
                </Link>
            </div>
        </form>
    );
}

export default UserLogin;
