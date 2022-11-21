import useForm from "@/hooks/useForm";
import { USER_REGISTER as inputData } from "@/constants/userInput";
import { USER_EDIT as endpoint } from "@/constants/requests";
import FormInput from "../common/FormInput";

export default function UserEdit({ user, setEditMode }) {
    const initialState = {
        email: user.email,
        userID: user.userID,
        nickname: user.nickname,
        password: "",
    };

    const { form, validatedForm, changeHandler, submitHandler } = useForm(initialState, endpoint);

    return (
        <form onSubmit={submitHandler}>
            <FormInput
                inputData={inputData}
                form={form}
                changeHandler={changeHandler}
                validatedForm={validatedForm}
            />
            <button>수정</button>
            <button type="button" onClick={() => setEditMode(false)}>
                취소
            </button>
        </form>
    );
}
