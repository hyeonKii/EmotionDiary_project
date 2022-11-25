import { useFetchUser, useRequestLogin } from "@/api/account";
import useForm from "@/hooks/useForm";
import { ROUTES } from "@/routes/route";
import { currentUser } from "@/temp/userAtom";
import React from "react";
import { Link } from "react-router-dom";
import { useSetRecoilState } from "recoil";

export default function UserLogin() {
    const setUser = useSetRecoilState(currentUser);

    const { form, changeHandler } = useForm({
        userID: "",
        password: "",
    });

    const { refetch: getUser } = useFetchUser(["user"], {
        enabled: false,
        retry: 3,

        onSuccess: (res) => {
            const {
                User: { nickname },
                certified_account,
            } = res.data;

            console.log("로그인 성공");

            setUser({ nickname });
        },

        onError: (error) => {
            console.log("로그인 실패 :" + error.message);
        },
    });

    const { mutate: loginRequest } = useRequestLogin(form, {
        onSuccess: (res) => {
            const { accessToken, refreshToken } = res.data;

            sessionStorage.setItem("accessToken", accessToken);
            sessionStorage.setItem("refreshToken", refreshToken);

            getUser();
        },

        onError: (error) => {
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
