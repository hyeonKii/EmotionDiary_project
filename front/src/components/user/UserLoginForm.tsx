import { Link } from "react-router-dom";

import useForm from "../../hooks/useForm";
import FormInput from "./FormInput";
import { ROUTES } from "@/routes/route";

import { USER_LOGIN } from "../../constants/Types";

interface IState {
    email: string;
    password: string;
}

const inputData: object[] = [
    {
        type: "email",
        name: "email",
        description: "이메일",
    },
    {
        type: "password",
        name: "password",
        description: "비밀번호",
    },
];

const initialState: IState = {
    email: "",
    password: "",
};

export default function LoginForm() {
    const { form, validatedForm, onChangeHandler } = useForm({
        initialState,
        endpoint: USER_LOGIN,
    });
    // requesthandler를 통해 이메일, 패스워드 유효성 검사

    const props = {
        inputData,
        form,
        validatedForm,
        onChangeHandler,
    };

    return (
        <>
            <FormInput {...props} />
            <button disabled={!form}>로그인</button>
            <div>아직 회원이 아니신가요?</div>
            <div>
                <Link to={ROUTES.REGISTER.path}>회원가입</Link>
            </div>
        </>
    );
}
