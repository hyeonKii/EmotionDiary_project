import { useState, FormEvent } from "react";
import { useNavigate } from "react-router-dom";

import { useRequestLogin } from "@/api/account";
import useForm from "@/hooks/useForm";
import useSetUser from "@/hooks/useSetUser";
import { setSession } from "@/util/setSession";
import Icon from "@/components/UI/Icon";
import { REGISTER, FIND_ID, FIND_PW } from "./constants/tabList";
import {
    Form,
    FormTitle,
    InputSection,
    InputBlock,
    FormButton,
    Error,
    BottomSection,
} from "@/styles/common/modal/Form-style";
import { useSetRecoilState } from "recoil";
import { currentForm, showLoginForm } from "@/temp/formAtom";

interface Response {
    data: {
        accessToken: string;
        refreshToken: string;
    };
}

interface Error {
    message: string;
}

interface Props {
    setShowLoginForm(value: boolean): void;
}

export default function UserLogin() {
    const navigate = useNavigate();
    const [error, setError] = useState(false);
    const { setUser } = useSetUser();

    const setCurrentForm = useSetRecoilState(currentForm);
    const setLoginForm = useSetRecoilState(showLoginForm);

    const { form, changeHandler } = useForm({
        userID: "",
        password: "",
    });

    const { mutate: loginRequest } = useRequestLogin(form, {
        onSuccess: (res: Response) => {
            const { accessToken, refreshToken } = res.data;

            setSession("accessToken", accessToken);
            setSession("refreshToken", refreshToken);

            setUser();
            setLoginForm(false);

            navigate("/home");
        },

        onError: (error: Error) => {
            setError(true);
            console.log(error.message);
        },
    });

    const submitHandler = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        loginRequest();
    };

    return (
        <Form onSubmit={submitHandler}>
            <FormTitle>로그인</FormTitle>
            <InputSection>
                <InputBlock>
                    <label htmlFor="userID">
                        <Icon icon="userID" />
                    </label>
                    <input id="userID" type="text" onChange={changeHandler} placeholder="아이디" />
                </InputBlock>
                <InputBlock>
                    <label htmlFor="password">
                        <Icon icon="password" />
                    </label>
                    <input
                        id="password"
                        type="password"
                        onChange={changeHandler}
                        placeholder="비밀번호"
                    />
                </InputBlock>
                {error && <Error>입력하신 정보를 다시 확인해주세요.</Error>}
            </InputSection>
            <BottomSection>
                <FormButton disabled={!form.userID || !form.password ? true : false}>
                    로그인
                </FormButton>
                <div className="register">
                    <span>계정이 없으신가요? </span>
                    <button type="button" onClick={() => setCurrentForm(REGISTER)}>
                        회원가입
                    </button>
                </div>
                <button type="button" onClick={() => setCurrentForm(FIND_ID)}>
                    아이디/
                </button>
                <button type="button" onClick={() => setCurrentForm(FIND_PW)}>
                    비밀번호 찾기
                </button>
            </BottomSection>
        </Form>
    );
}
