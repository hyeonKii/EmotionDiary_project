import { useRequestRegisterUser } from "@/api/account";
import useForm from "@/hooks/useForm";
import React from "react";

interface Error {
    message: string;
}

export default function UserRegisterTab() {
    const { form, changeHandler } = useForm({
        email: "",
        userID: "",
        nickname: "",
        password: "",
    });

    const { mutate: registerRequest } = useRequestRegisterUser(form, {
        onSuccess: () => {
            console.log("회원가입 성공");
        },

        onError: (error: Error) => {
            console.log("회원가입 실패 :" + error.message);
        },
    });

    const submitHandler = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        registerRequest();
    };

    return (
        <form onSubmit={submitHandler}>
            <div>
                <input id="userID" type="text" onChange={changeHandler} placeholder="아이디" />
                <div>이미 존재하는 아이디입니다.</div>
            </div>
            <div>
                <input id="email" type="email" onChange={changeHandler} placeholder="이메일" />
                <div>이미 존재하는 이메일입니다.</div>
            </div>
            <div>
                <input id="nickname" type="text" onChange={changeHandler} placeholder="닉네임" />
                <div>이미 존재하는 닉네임입니다.</div>
            </div>
            <div>
                <input
                    id="password"
                    type="password"
                    onChange={changeHandler}
                    placeholder="비밀번호"
                />
            </div>
            <div>
                <input
                    id="confirmPwd"
                    type="password"
                    onChange={changeHandler}
                    placeholder="비밀번호 확인"
                />
                <div>비밀번호가 일치하지 않습니다.</div>
            </div>
            <button>회원가입</button>
        </form>
    );
}
