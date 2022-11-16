import useForm from "@/hooks/useForm";
import UserRegisterValidation from "@/validations/UserRegisterValidation";
import FormInput from "@/components/common/FormInput";
import { USER_REGISTER } from "@/constants/types";

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
        validationFn: UserRegisterValidation,
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
