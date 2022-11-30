import { useRequestSendCode } from "@/api/certificate";
import useForm from "@/hooks/useForm";
import { useState } from "react";
import styled from "styled-components";
import Icon from "../UI/Icon";

interface Props {
    setTabNumber(value: number): void;
    tabList: { REGISTER: number; LOGIN: number; FIND_ID: number };
}

export default function UserIDtoFind({ setTabNumber, tabList }: Props) {
    const { form, changeHandler } = useForm({ email: "", target: "password", code: "" });

    const {
        isError: emailError,
        isSuccess: emailSuccess,
        mutate: sendCode,
    } = useRequestSendCode(form, {
        onSuccess: () => {
            console.log("비밀번호 전송 완료.");
        },
        onError: () => {
            console.log("비밀번호 전송 실패");
        },
    });

    const sendCodeHandler = () => {
        sendCode();
    };
    return (
        <FormStyle>
            <fieldset>
                <h2>비밀번호 찾기</h2>
                <InputSection>
                    <DescriptionLabel>가입하신 이메일을 입력해주세요.</DescriptionLabel>
                    <InputField>
                        <Icon icon="email" />
                        <input
                            id="email"
                            type="email"
                            placeholder="이메일"
                            onChange={changeHandler}
                        />
                        <Button type="button" onClick={sendCodeHandler}>
                            인증
                        </Button>
                    </InputField>
                    {emailError && (
                        <SmallError>이미 가입된 이메일이거나 코드가 전송된 상태입니다.</SmallError>
                    )}
                </InputSection>
                {emailSuccess && <Success>이메일로 임시 비밀번호가 발급되었습니다.</Success>}
                <LoginButtonStyle onClick={() => setTabNumber(tabList.LOGIN)}>
                    로그인 하기
                </LoginButtonStyle>
                <BottomSectionStyle>
                    <BottomRegisterStyle>
                        <span>계정이 없으신가요? </span>
                        <Register>
                            <button type="button" onClick={() => setTabNumber(tabList.REGISTER)}>
                                회원가입
                            </button>
                        </Register>
                    </BottomRegisterStyle>
                    <BottomFindSomethingStyle>
                        <span>
                            <button type="button" onClick={() => setTabNumber(tabList.FIND_ID)}>
                                아이디 찾기
                            </button>
                        </span>
                    </BottomFindSomethingStyle>
                </BottomSectionStyle>
            </fieldset>
        </FormStyle>
    );
}

const Button = styled.button`
    width: 17.5%;
    border-radius: 0 12px 12px 0;
    height: 2.5rem;
    background-color: lightblue;
    color: white;
`;

const SmallError = styled.div`
    color: red;
    font-size: 0.8rem;
    margin-top: 0.5rem;
`;

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

const Error = styled.div`
    color: red;
    font-size: 0.9rem;
`;

const Success = styled.div`
    font-size: 0.9rem;
`;

const BottomSectionStyle = styled.div`
    font-size: 0.8rem;
    text-align: center;
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

const InputField = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
`;

const InputSection = styled.div`
    width: 100%;
    margin-bottom: 2rem;

    input {
        width: 80%;
        height: 2.5rem;

        border: 1px solid lightgray;
        border-radius: 8px 0 0 8px;

        padding-left: 2rem;
    }

    div {
        position: relative;
    }
`;

const DescriptionLabel = styled.label`
    display: inline-block;
    font-size: 0.8rem;
    margin-bottom: 0.5rem;
`;
