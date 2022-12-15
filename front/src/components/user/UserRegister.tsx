import { useState } from "react";
import useForm from "@/hooks/useForm";
import { useRequestRegisterUser } from "@/api/account";
import UserEmailCheckTab from "./UserEmailCheckTab";
import UserRegisterTab from "./UserRegisterTab";
import { LOGIN } from "./constants/tabList";
import { Form, FormTitle, BottomSection } from "@/styles/common/modal/Form-style";
import { useSetRecoilState } from "recoil";
import { currentForm } from "@/temp/formAtom";

export default function UserRegister() {
    const [tab, setTab] = useState(false);
    const [requiredEmail, setRequiredEmail] = useState("");
    const [error, setError] = useState("");

    const setCurrentForm = useSetRecoilState(currentForm);

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

            onError: (error) => {
                console.log("회원가입 실패 :" + error.message);

                if (error.response?.data === "User already exists") {
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
                />
            )}
            {!isSuccess && (
                <BottomSection>
                    <span>이미 계정이 있으신가요? </span>
                    <button type="button" onClick={() => setCurrentForm(LOGIN)}>
                        로그인
                    </button>
                </BottomSection>
            )}
        </Form>
    );
}
