import useForm from "@/hooks/useForm";
import validationFn from "@/validations/userRegisterValidation";
import FormInput from "@/components/common/FormInput";
import { USER_REGISTER as endpoint } from "@/constants/requests";
import {
    USER_REGISTER as inputData,
    USER_REGISTER_INITIAL as initialState,
} from "@/constants/userInput";

export default function UserRegister() {
    const { form, validatedForm, changeHandler, submitHandler } = useForm(
        initialState,
        endpoint,
        validationFn
    );

    return (
        <form onSubmit={submitHandler}>
            <FormInput
                inputData={inputData}
                form={form}
                validatedForm={validatedForm}
                changeHandler={changeHandler}
            />
            <button>회원가입</button>
        </form>
    );
}
