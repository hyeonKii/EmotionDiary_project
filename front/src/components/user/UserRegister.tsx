import React, { useState } from "react";
import useForm from "@/hooks/useForm";
import { Link } from "react-router-dom";
import { ROUTES } from "@/routes/route";
import {Form, FormTitle, FormButton, Container, Input, AuthButton, ModalTab, ModalTabList, ModalLabel, CorrectButton, AccountMessage, InputError } from "@/styles/common/Modal/Form-style";
import Icon from "../UI/icon";

const FirstTab = ({ changeHandler }) => {
    return (
        <>
            
            <ModalLabel htmlFor="email">가입하신 이메일을 입력해 주세요.</ModalLabel>
            <Container>
                <Icon icon="email" />
                <Input id="email" type="email" onChange={changeHandler} placeholder="이메일" />
                <AuthButton type="button">인증</AuthButton>
                <InputError>가입되지 않은 이메일입니다.</InputError>
            </Container>
            
            
            <ModalLabel htmlFor="certifcation">이메일로 전송된 인증번호 여덟 자리를 입력해주세요.</ModalLabel>
            <Container>
                <Icon icon="certification" />
                <Input
                    id="certifcation"
                    type="text"
                    onChange={changeHandler}
                    placeholder="인증번호 입력"
                />
                {/* <span>시간</span> */}
                <CorrectButton type="button">확인</CorrectButton>
            </Container>
            <FormButton>다음</FormButton>
        </>
    );
};

const SecondTab = ({ changeHandler }) => {
    return (
        <>
            <Container>
                <Icon icon="userID" />
                <Input id="userID" type="text" onChange={changeHandler} placeholder="아이디" />
                <InputError>이미 존재하는 아이디입니다.</InputError>
            </Container>
            
            <Container>
                <Icon icon="userID" />
                <Input id="nickname" type="text" onChange={changeHandler} placeholder="닉네임" />
                <InputError>이미 존재하는 닉네임입니다.</InputError>
            </Container>   
            <Container>
                <Icon icon="password" />
                <Input id="password" type="password" onChange={changeHandler} placeholder="비밀번호" />
            </Container>
            <Container>
                <Icon icon="correctPassword" />
                <Input
                    id="confirmPwd"
                    type="password"
                    onChange={changeHandler}
                    placeholder="비밀번호 확인"
                />
                <InputError>비밀번호가 일치하지 않습니다.</InputError>
            </Container>
            
            <FormButton>회원가입</FormButton>
        </>
    );
};

export default function UserRegister() {
    const [tab, setTab] = useState<boolean>(false);
    const { form, validatedForm, changeHandler } = useForm({ email: "", certification: "" });

    const submitHandler = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
    };

    return (
        <Form onSubmit={submitHandler}>
            <FormTitle>회원가입</FormTitle>

            <ModalTab>
                <ModalTabList onClick={() => setTab(false)}>{"step1"}</ModalTabList>
                <ModalTabList onClick={() => setTab(true)}>{"step2"}</ModalTabList>
            </ModalTab>
            
            {!tab ? (
                <FirstTab changeHandler={changeHandler} />
            ) : (
                <SecondTab changeHandler={changeHandler} />
            )}
            
            <AccountMessage>
                이미 계정이 있으신가요? {""}
                <Link
                    to={ROUTES.LOGIN.path}
                    style={{
                        textDecoration: "none",
                        color: "#47B5FF",
                    }}
                >
                    로그인
                </Link>
            </AccountMessage>
        </Form>
    );
}
