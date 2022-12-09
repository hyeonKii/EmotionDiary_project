import { useRequestRegisterUser } from "@/api/account";
import useForm from "@/hooks/useForm";
import { useState } from "react";
import styled from "styled-components";
import UserEmailCheckTab from "./UserEmailCheckTab";
import UserRegisterTab from "./UserRegisterTab";
import { LOGIN } from "./constants/tabList";

interface Props {
    setTabNumber(value: number): void;
}

interface Error {
    message: string;
    response: {
        data: string;
    };
}

export default function UserRegister({ setTabNumber }: Props) {
    const [tab, setTab] = useState(false);
    const [requiredEmail, setRequiredEmail] = useState("");
    const [error, setError] = useState("");

    const { form, changeHandler } = useForm({
        email: "",
        userID: "",
        nickname: "",
        password: "",
        confirmPwd: "",
    });

    const { isSuccess, mutate: registerRequest } = useRequestRegisterUser(
        { ...form, email: requiredEmail },
        {
            onSuccess: () => {
                console.log("회원가입 성공");
                setError("");
            },

            onError: (error: Error) => {
                console.log("회원가입 실패 :" + error.message);

                if (error.response.data === "User already exists") {
                    setError("이미 아이디가 존재합니다.");
                    return;
                }
                setError("회원가입 요청이 실패했습니다.");
            },
        }
    );

    const submitHandler = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log(requiredEmail);
        registerRequest();
    };

    return (
        <FormStyle onSubmit={submitHandler}>
            <fieldset>
                <h2>회원가입</h2>
                <div>{tab}</div>
                {!tab ? (
                    <UserEmailCheckTab setTab={setTab} setRequiredEmail={setRequiredEmail} />
                ) : (
                    <UserRegisterTab
                        form={form}
                        changeHandler={changeHandler}
                        error={error}
                        isSuccess={isSuccess}
                        setTabNumber={setTabNumber}
                    />
                )}
                {!isSuccess && (
                    <BottomSectionStyle>
                        <span>이미 계정이 있으신가요? </span>
                        <Register>
                            <button type="button" onClick={() => setTabNumber(LOGIN)}>
                                로그인
                            </button>
                        </Register>
                    </BottomSectionStyle>
                )}
            </fieldset>
        </FormStyle>
    );
}

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
    background-color: lightblue;
`;

const ErrorStyle = styled.div`
    color: red;
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
