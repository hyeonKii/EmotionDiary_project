import { useRequestLogin } from "@/api/user";
import useForm from "@/hooks/useForm";
import axios from "axios";
import React from "react";
import { QueryClient } from "react-query";

function UserLogin() {
    const queryClient = new QueryClient();

    const { form, changeHandler } = useForm({ userID: "", password: "" });

    const { mutate: login } = useRequestLogin(form, {
        onSuccess: (data) => {
            const { userID, nickname, email, accessToken, refreshToken } = data;

            queryClient.setQueryData(["user"], { userID, nickname, email });
            axios.defaults.headers.common["Authorization"] = accessToken;
            queryClient.setQueryData(["refreshToken"], refreshToken);
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
            <label htmlFor="userID">아이디</label>
            <input type="text" id="userID" onChange={changeHandler} />
            <label htmlFor="password">비밀번호</label>
            <input type="password" id="password" onChange={changeHandler} />
            <button>로그인</button>
        </form>
    );
}

export default UserLogin;
