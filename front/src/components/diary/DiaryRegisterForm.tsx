import useForm from "@/hooks/useForm";
import FormInput from "@/components/common/FormInput";
import { DIARY_REGISTER } from "@/constants/requestTypes";
import { InputDataType } from "@/types/inputData_type";

const inputData: InputDataType = [
    {
        type: "textarea",
        name: "text",
        description: "일기 쓰기",
    },
];

const initialState = {
    text: "",
};

export default function DiaryRegisterForm() {
    const { form, validatedForm, onChangeHandler, onSubmitHandler } = useForm({
        initialState,
        endpoint: DIARY_REGISTER,
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
            <button>저장</button>
        </form>
    );
}
