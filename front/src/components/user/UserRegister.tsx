import React, { useState } from "react";
import useForm from "@/hooks/useForm";
import { Link } from "react-router-dom";
import { ROUTES } from "@/routes/route";
import Icon from "../UI/Icon";

const FirstTab = ({ changeHandler }) => {
    return (
        <>
            {/* <Icon icon="email" /> */}
            <label htmlFor="email">가입하신 이메일을 입력해 주세요.</label>
            <div>
                <input id="email" type="email" onChange={changeHandler} placeholder="이메일" />
                <button type="button">인증</button>
            </div>
            <div>가입되지 않은 이메일입니다.</div>
            {/* <Icon icon="certification" /> */}
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
            <button>다음</button>
        </>
    );
};

const SecondTab = ({ changeHandler }) => {
    return (
        <>
            {/* <Icon icon="userID" /> */}
            <input id="userID" type="text" onChange={changeHandler} placeholder="아이디" />
            <div>이미 존재하는 아이디입니다.</div>
            {/* <Icon icon="userID" /> */}
            <input id="nickname" type="text" onChange={changeHandler} placeholder="닉네임" />
            <div>이미 존재하는 닉네임입니다.</div>
            <input id="password" type="password" onChange={changeHandler} placeholder="비밀번호" />
            <input
                id="confirmPwd"
                type="password"
                onChange={changeHandler}
                placeholder="비밀번호 확인"
            />
            <div>비밀번호가 일치하지 않습니다.</div>
            <button>회원가입</button>
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
        <form onSubmit={submitHandler}>
            <div>회원가입</div>
            <ul>
                <li onClick={() => setTab(false)}>{"step1"}</li>
                <li onClick={() => setTab(true)}>{"step2"}</li>
            </ul>
            {tab ? (
                <FirstTab changeHandler={changeHandler} />
            ) : (
                <SecondTab changeHandler={changeHandler} />
            )}
            <div>
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
            </div>
        </form>
    );
}
