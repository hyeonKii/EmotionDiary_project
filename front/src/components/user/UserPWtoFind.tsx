import useForm from "@/hooks/useForm";
import { Link } from "react-router-dom";
import { ROUTES } from "@/routes/route";
import React from "react";
import Icon from "../UI/Icon";

export default function UserPWtoFind() {
    const { form, validatedForm, changeHandler } = useForm({ email: "" });

    const submitHandler = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
    };

    return (
        <form onSubmit={submitHandler}>
            <div>비밀번호 찾기</div>
            {/* <Icon icon="email" /> */}
            <label htmlFor="email">가입하신 이메일을 입력해주세요.</label>
            <div>
                <input type="email" id="email" onChange={changeHandler} placeholder="이메일" />
                <button type="button">인증</button>
            </div>
            <div>가입되지 않은 이메일입니다.</div>
            <div>이메일로 임시 비밀번호가 발급되었습니다.</div>
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
                    to={ROUTES.FINDID.path}
                    style={{
                        textDecoration: "none",
                        color: "#47B5FF",
                    }}
                >
                    아이디 찾기
                </Link>
            </div>
        </form>
    );
}
