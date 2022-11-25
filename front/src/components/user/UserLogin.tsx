import { useRequestLogin } from "@/api/user";
import useForm from "@/hooks/useForm";
import { ROUTES } from "@/routes/route";
import axios from "axios";
import React, { useEffect } from "react";
import { QueryClient } from "react-query";
import { Link } from "react-router-dom";
import {Form, FormTitle, FormButton, Container, AccountMessage, FindMessage, Input } from "@/styles/common/Modal/Form-style";


import Icon from "../UI/icon";


export default function UserLogin() {
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
        <Form onSubmit={loginUser}>
            <FormTitle>로그인</FormTitle>
            <Container>
                <Icon icon="userID" />
                <Input type="text" id="userID" onChange={changeHandler} placeholder="아이디" />
            </Container>
            <Container>
                <Icon icon="password" />
                <Input type="password" id="password" onChange={changeHandler} placeholder="비밀번호" />
            </Container>
            <FormButton>로그인</FormButton>
            <AccountMessage>
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
            </AccountMessage>
            <FindMessage>
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
            </FindMessage>
        </Form>
    );
}
