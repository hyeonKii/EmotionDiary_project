import useForm from "../../hooks/useForm";

import RegisterValidation from "./RegisterValidation";
import FormInput from "./FormInput";

import { USER_REGISTER } from "../../api/Types";

interface IState {
    name: string;
    email: string;
    password: string;
}

const initialState: IState = {
    name: "",
    email: "",
    password: "",
};

const inputData: object[] = [
    {
        type: "text",
        name: "name",
        description: "이름",
    },
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

export default function RegisterForm() {
    const { form, validatedForm, onChangeHandler, onSubmitHandler } = useForm({
        initialState,
        endpoint: USER_REGISTER,
        validationFn: RegisterValidation,
    });

    const props = {
        inputData,
        form,
        validatedForm,
        onChangeHandler,
    };

    return (
        <form onSubmit={onSubmitHandler}>
            <FormInput {...props} />
            <button>회원가입</button>
        </form>
    );
}
