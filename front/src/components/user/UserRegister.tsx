import { useState } from "react";
import useForm from "@/hooks/useForm";
import { useRequestRegisterUser } from "@/api/account";
import UserEmailCheckTab from "./UserEmailCheckTab";
import UserRegisterTab from "./UserRegisterTab";
import { LOGIN } from "./constants/tabList";
import { Form, FormTitle, Error, BottomSection } from "@/styles/common/Modal/Form-style";

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
        registerRequest();
    };

    return (
        <Form onSubmit={submitHandler}>
            <FormTitle>회원가입</FormTitle>
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
                <BottomSection>
                    <span>이미 계정이 있으신가요? </span>
                    <button type="button" onClick={() => setTabNumber(LOGIN)}>
                        로그인
                    </button>
                </BottomSection>
            )}
        </Form>
    );
}
