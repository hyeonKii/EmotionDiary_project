import useForm from "@/hooks/useForm";
import { Link } from "react-router-dom";
import { ROUTES } from "@/routes/route";
import React from "react";
import {
    Form,
    FormTitle,
    FormButton,
    FindMessage,
    Container,
    Input,
    ModalLabel,
    AuthButton,
    ConfirmAccount,
    InputError,
} from "@/styles/common/Modal/Form-style";

export default function UserPWtoFind() {
    const { form, validatedForm, changeHandler } = useForm({ email: "" });

    const submitHandler = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
    };

    return (
        <Form onSubmit={submitHandler}>
            <FormTitle>비밀번호 찾기</FormTitle>

            <ModalLabel htmlFor="email">가입하신 이메일을 입력해주세요.</ModalLabel>
            <Container>
                {/* <Icon icon="email" /> */}
                <Input type="email" id="email" onChange={changeHandler} placeholder="이메일" />
                <AuthButton type="button">인증</AuthButton>
                <InputError>가입되지 않은 이메일입니다.</InputError>
            </Container>

            <ModalLabel>이메일로 임시 비밀번호가 발급되었습니다.</ModalLabel>
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
                    to={ROUTES.FINDID.path}
                    style={{
                        textDecoration: "none",
                        color: "#47B5FF",
                    }}
                >
                    아이디 찾기
                </Link>
            </FindMessage>
        </Form>
    );
}
