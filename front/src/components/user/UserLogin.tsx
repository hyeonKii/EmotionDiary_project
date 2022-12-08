import { useNavigate } from "react-router-dom";
import { useRequestLogin } from "@/api/account";
import useForm from "@/hooks/useForm";
import useSetUser from "@/hooks/useSetUser";
import setSession from "@/util/setSession";
import React, { useState } from "react";
import styled from "styled-components";
import Icon from "../UI/Icon";
import { REGISTER, FIND_ID, FIND_PW } from "./constants/tabList";

interface Response {
    data: {
        accessToken: string;
        refreshToken: string;
    };
}

interface Error {
    message: string;
}

interface Props {
    setTabNumber(value: number): void;
    setShowLoginForm(value: boolean): void;
}

export default function UserLogin({ setTabNumber, setShowLoginForm }: Props) {
    const navigate = useNavigate();
    const [error, setError] = useState(false);
    const { setUser } = useSetUser();

    const { form, changeHandler } = useForm({
        userID: "",
        password: "",
    });

    const { mutate: loginRequest } = useRequestLogin(form, {
        onSuccess: (res: Response) => {
            const { accessToken, refreshToken } = res.data;

            setSession("accessToken", accessToken);
            setSession("refreshToken", refreshToken);

            setUser();

            setShowLoginForm(false);
            navigate("/home");
        },

        onError: (error: Error) => {
            setError(true);
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
                {error && <ErrorStyle>입력하신 정보를 다시 확인해주세요.</ErrorStyle>}
                <LoginButtonStyle disabled={!form.userID || !form.password ? true : false}>
                    로그인
                </LoginButtonStyle>
                <BottomSectionStyle>
                    <BottomRegisterStyle>
                        <span>계정이 없으신가요? </span>
                        <Register>
                            <button type="button" onClick={() => setTabNumber(REGISTER)}>
                                회원가입
                            </button>
                        </Register>
                    </BottomRegisterStyle>
                    <BottomFindSomethingStyle>
                        <span>
                            <button type="button" onClick={() => setTabNumber(FIND_ID)}>
                                아이디
                            </button>
                        </span>
                        <span> / </span>
                        <span>
                            <button type="button" onClick={() => setTabNumber(FIND_PW)}>
                                비밀번호 찾기
                            </button>
                        </span>
                    </BottomFindSomethingStyle>
                </BottomSectionStyle>
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
    height: 55%;
    width: 25%;
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
    }
`;

const LoginButtonStyle = styled.button`
    width: 100%;
    height: 2.5rem;

    margin-top: 2rem;
    margin-bottom: 1.5rem;

    color: white;
    border: none;
    border-radius: 8px;
    background-color: ${(props) => (props.disabled ? "gray" : "lightblue")};
`;

const ErrorStyle = styled.div`
    color: red;
    font-size: 0.9rem;
`;

const BottomSectionStyle = styled.div`
    font-size: 0.8rem;
`;

const BottomRegisterStyle = styled.div`
    margin-bottom: 0.5rem;
`;

const Register = styled.span`
    button {
        font-size: 0.9rem;
        color: lightblue;
    }
`;

const BottomFindSomethingStyle = styled.div`
    color: lightblue;

    button {
        color: lightblue;
    }
`;
