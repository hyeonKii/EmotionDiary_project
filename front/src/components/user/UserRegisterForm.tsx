import useForm from "@/hooks/useForm";
import userRegisterValidation from "@/validations/userRegisterValidation";
import FormInput from "@/components/common/FormInput";
import { USER_REGISTER } from "@/constants/requests";
import { InputDataType } from "@/types/inputData_type";

const inputData: InputDataType = [
    {
        type: "email",
        name: "email",
        description: "이메일",
    },
    {
        type: "text",
        name: "userID",
        description: "아이디",
    },
    {
        type: "text",
        name: "nickname",
        description: "별명",
    },
    {
        type: "password",
        name: "password",
        description: "비밀번호",
    },
];

const initialState = {
    email: "",
    userID: "",
    nickname: "",
    password: "",
};

export default function UserRegisterForm() {
    const { form, validatedForm, onChangeHandler, onSubmitHandler } = useForm({
        initialState,
        endpoint: USER_REGISTER,
        validationFn: userRegisterValidation,
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
