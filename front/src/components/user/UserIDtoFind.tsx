import styled from "styled-components";
import useForm from "@/hooks/useForm";
import { Link } from "react-router-dom";
import { ROUTES } from "@/routes/route";
import React from "react";
import {
    Form,
    FormTitle,
    FormButton,
    Container,
    FindMessage,
    Input,
    AuthButton,
    CorrectButton,
    ModalLabel,
    ConfirmAccount,
    InputError,
} from "@/styles/common/Modal/Form-style";

export default function UserIDtoFind() {
    const { form, validatedForm, changeHandler } = useForm({ email: "", certification: "" });

    const submitHandler = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
    };

    return (
        <Form onSubmit={submitHandler}>
            <FormTitle>아이디 찾기</FormTitle>

            <ModalLabel htmlFor="email">가입하신 이메일을 입력해 주세요.</ModalLabel>
            <Container>
                {/* <Icon icon="email" /> */}
                <Input id="email" type="email" onChange={changeHandler} placeholder="이메일" />
                <AuthButton type="button">인증</AuthButton>
                <InputError>가입되지 않은 이메일입니다.</InputError>
            </Container>
            <ModalLabel htmlFor="certifcation">
                이메일로 전송된 인증번호 여덟 자리를 입력해주세요.
            </ModalLabel>
            <Container>
                {/* <Icon icon="certification" /> */}
                <Input
                    id="certifcation"
                    type="text"
                    onChange={changeHandler}
                    placeholder="인증번호 입력"
                />
                {/* <span>시간</span> */}
                <CorrectButton type="button">확인</CorrectButton>
                <InputError>올바르지 않은 인증번호입니다.</InputError>
            </Container>

            <ModalLabel>아이디는 ~입니다.</ModalLabel>
            <FormButton>로그인 하기</FormButton>
            <ConfirmAccount>
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
            </ConfirmAccount>
            <FindMessage>
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
