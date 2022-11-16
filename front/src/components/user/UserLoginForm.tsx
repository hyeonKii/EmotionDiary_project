import useForm from "@/hooks/useForm";
import FormInput from "@/components/common/FormInput";
import { USER_LOGIN } from "@/constants/types";

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

export default function UserLoginForm() {
    const { form, validatedForm, onChangeHandler, onSubmitHandler } = useForm({
        initialState,
        endpoint: USER_LOGIN,
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
            <button>로그인</button>
        </form>
    );
}
