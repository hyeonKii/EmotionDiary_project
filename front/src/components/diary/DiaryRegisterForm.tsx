import useForm from "@/hooks/useForm";
import FormInput from "@/components/common/FormInput";
import { DIARY_REGISTER } from "@/constants/requests";
import { InputDataType } from "@/types/inputData_type";

const inputData: InputDataType = [
    {
        type: "text",
        name: "title",
        description: "제목",
    },
    {
        type: "textarea",
        name: "description",
        description: "일기 쓰기",
    },
];

const initialState = {
    title: "",
    description: "",
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
