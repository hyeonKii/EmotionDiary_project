import { useRequestLogin } from "@/api/account";
import useForm from "@/hooks/useForm";
import useSetUser from "@/hooks/useSetUser";
import { ROUTES } from "@/routes/route";
import setSession from "@/util/setSession";
import React from "react";
import { Link } from "react-router-dom";

import styled from "styled-components";
import Icon from "../UI/Icon";

interface Response {
    data: {
        accessToken: string;
        refreshToken: string;
    };
}

interface Error {
    message: string;
}

export default function UserLogin() {
    const { form, changeHandler } = useForm({
        userID: "",
        password: "",
    });

    const { setUser } = useSetUser();

    const { mutate: loginRequest } = useRequestLogin(form, {
        onSuccess: (res: Response) => {
            const { accessToken, refreshToken } = res.data;

            setSession("accessToken", accessToken);
            setSession("refreshToken", refreshToken);

            setUser();
        },

        onError: (error: Error) => {
            console.log(error.message);
        },
    });

    const submitHandler = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        loginRequest();
    };

    return (
        <FormStyle onSubmit={submitHandler}>
            <fieldset>
                <h2>로그인</h2>
                <div>
                    <label htmlFor="userID">
                        <Icon icon="userID" />
                    </label>
                    <input id="userID" type="text" onChange={changeHandler} placeholder="아이디" />
                </div>
                <div>
                    <label htmlFor="password">
                        <Icon icon="password" />
                    </label>
                    <input
                        id="password"
                        type="password"
                        onChange={changeHandler}
                        placeholder="비밀번호"
                    />
                </div>
                <button>로그인</button>
                <div>
                    <span>계정이 없으신가요?</span>
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
            </fieldset>
        </FormStyle>
    );
}

const FormStyle = styled.form`
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    box-shadow: 2px 2px 10px rgba(110, 110, 110, 1);
    z-index: 20;
    border-radius: 20px;
    background-color: white;
    height: 50%;
    width: 20%;
    min-width: 250px;
    min-height: 460px;

    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;

    fieldset {
        width: 70%;
        height: 100%;

        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        border: none;

        h2 {
            margin-bottom: 3rem;
        }

        div {
            position: relative;
            width: 100%;
            text-align: center;
        }

        input {
            width: 100%;
            height: 2.5rem;

            border: 1px solid lightgray;
            border-radius: 8px;

            margin-bottom: 2rem;
            padding-left: 2rem;
        }

        button {
            width: 100%;
            height: 2.5rem;

            margin-top: 2rem;
            margin-bottom: 1rem;

            color: white;
            border: none;
            border-radius: 8px;
            background-color: lightblue;
        }
    }
`;
