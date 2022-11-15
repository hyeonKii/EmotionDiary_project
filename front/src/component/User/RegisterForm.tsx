import RegisterValidation from "./RegisterValidation";
import useForm from "../../hooks/useForm";
import FormInput from "./FormInput";

interface IState {
    name: string;
    email: string;
    password: string;
}

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

const initialState: IState = {
    name: "",
    email: "",
    password: "",
};

export default function RegisterForm() {
    const { form, validatedForm, onChangeHandler, onSubmitHandler } = useForm({
        initialState,
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
