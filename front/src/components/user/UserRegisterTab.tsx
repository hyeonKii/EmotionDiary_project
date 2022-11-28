import React from "react";
import styled from "styled-components";
import Icon from "../UI/Icon";

interface Props {
    form: {
        password: string;
        confirmPwd: string;
    };
    changeHandler(event: React.ChangeEvent<HTMLInputElement>): void;
    error: boolean;
}

export default function UserRegisterTab({ form, changeHandler, error }: Props) {
    const checkPassword = form.password !== form.confirmPwd ? true : false;

    return (
        <>
            <InputSection>
                <label htmlFor="userID">
                    <Icon icon="userID" />
                </label>
                <input id="userID" type="text" onChange={changeHandler} placeholder="아이디" />
                {error && <Error>이미 존재하는 아이디입니다.</Error>}
            </InputSection>
            <InputSection>
                <label htmlFor="nickname">
                    <Icon icon="userID" />
                </label>
                <input id="nickname" type="text" onChange={changeHandler} placeholder="닉네임" />
            </InputSection>
            <InputSection>
                <label htmlFor="certification">
                    <Icon icon="certification" />
                </label>
                <input
                    id="password"
                    type="password"
                    onChange={changeHandler}
                    placeholder="비밀번호"
                />
            </InputSection>
            <InputSection>
                <label htmlFor="certification">
                    <Icon icon="certification" />
                </label>
                <input
                    id="confirmPwd"
                    type="password"
                    onChange={changeHandler}
                    placeholder="비밀번호 확인"
                />
                {checkPassword && <Error>비밀번호가 일치하지 않습니다.</Error>}
            </InputSection>
            <LoginButtonStyle>회원가입</LoginButtonStyle>
        </>
    );
}

const InputSection = styled.div`
    width: 100%;
    margin-bottom: 1rem;
    position: relative;

    input {
        width: 100%;
        height: 2.5rem;

        border: 1px solid lightgray;
        border-radius: 8px;

        padding-left: 2rem;
    }
`;

const Error = styled.div`
    color: red;
    font-size: 0.8rem;
    margin-top: 0.5rem;
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
