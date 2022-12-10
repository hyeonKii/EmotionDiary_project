import { useRequestLogin } from "@/api/account";
import useForm from "@/hooks/useForm";
import useSetUser from "@/hooks/useSetUser";
import { ROUTES } from "@/routes/route";
import React from "react";
import { Link } from "react-router-dom";

interface Response {
    data: {
        accessToken: string;
        refreshToken: string;
    };
}

interface Error {
    message: string;
}

export default function UserLogin() {
    const { form, changeHandler } = useForm({
        userID: "",
        password: "",
    });

    const { setUser } = useSetUser();

    const { mutate: loginRequest } = useRequestLogin(form, {
        onSuccess: (res: Response) => {
            const { accessToken, refreshToken } = res.data;

            sessionStorage.setItem("accessToken", accessToken);
            sessionStorage.setItem("refreshToken", refreshToken);

            setUser();
        },

        onError: (error: Error) => {
            console.log(error.message);
        },
    });

    const submitHandler = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        loginRequest();
    };

    return (
        <form onSubmit={submitHandler}>
            <div>
                <input id="userID" type="text" onChange={changeHandler} placeholder="아이디" />
            </div>
            <div>
                <input
                    id="password"
                    type="password"
                    onChange={changeHandler}
                    placeholder="비밀번호"
                />
            </div>
            <button>로그인</button>
            <div>계정이 없으신가요?</div>
            <Link
                to={ROUTES.REGISTER.path}
                style={{
                    textDecoration: "none",
                    color: "#47B5FF",
                }}
            >
                회원가입
            </Link>
        </form>
    );
}
