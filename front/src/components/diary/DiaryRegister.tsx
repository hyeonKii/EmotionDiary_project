import useForm from "@/hooks/useForm";
import FormInput from "@/components/common/FormInput";
import { DIARY_REGISTER as endpoint } from "@/constants/requests";
import {
    DIARY_REGISTER as inputData,
    DIARY_REGISTER_INITIAL as initialState,
} from "@/constants/diaryInput";

export default function DiaryRegister() {
    const { form, validatedForm, changeHandler, submitHandler } = useForm(initialState, endpoint);

    return (
        <form onSubmit={submitHandler}>
            <FormInput
                inputData={inputData}
                form={form}
                validatedForm={validatedForm}
                changeHandler={changeHandler}
            />
            <button>저장</button>
        </form>
    );
}
