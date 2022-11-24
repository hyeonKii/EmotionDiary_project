import styled from "styled-components";
import useForm from "@/hooks/useForm";
import { Link } from "react-router-dom";
import { ROUTES } from "@/routes/route";
import React from "react";
import Icon from "../UI/Icon";

export default function UserIDtoFind() {
    const { form, validatedForm, changeHandler } = useForm({ email: "", certification: "" });

    const submitHandler = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
    };

    return (
        <form onSubmit={submitHandler}>
            <div>아이디 찾기</div>
            <Icon icon="email" />
            <label htmlFor="email">가입하신 이메일을 입력해 주세요.</label>
            <div>
                <input id="email" type="email" onChange={changeHandler} placeholder="이메일" />
                <button type="button">인증</button>
            </div>
            <div>가입되지 않은 이메일입니다.</div>
            <Icon icon="certification" />
            <label htmlFor="certifcation">이메일로 전송된 인증번호 여덟 자리를 입력해주세요.</label>
            <div>
                <input
                    id="certifcation"
                    type="text"
                    onChange={changeHandler}
                    placeholder="인증번호 입력"
                />
                <span>시간</span>
                <button type="button">확인</button>
            </div>
            <div>올바르지 않은 인증번호입니다.</div>
            <div>아이디는 ~입니다.</div>
            <button>로그인 하기</button>
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

const Form = styled.form`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
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
`;

const FormTitle = styled.div`
    margin-bottom: 60px;
    font-size: 2rem;
    font-weight: bold;
`;

const FormButton = styled.button`
    width: 12rem;
    height: 2rem;
    margin-top: 15px;
    outline: none;
    border: none;
    border-radius: 4px;
    font-size: 12px;
    background-color: #47b5ff;
    color: white;
`;

const AccountMessage = styled.div`
    margin-top: 15px;
    font-size: 12px;
    font-weight: bold;
`;

const FindMessage = styled.div`
    margin-top: 5px;
    font-size: 12px;
    font-weight: bold;
    color: #26ade8;
`;
