import useForm from "@/hooks/useForm";
import FormInput from "@/components/common/FormInput";
import { DIARY_REGISTER } from "@/constants/types";

interface IState {
    text: string;
}

const initialState: IState = {
    text: "",
};

const inputData: object[] = [
    {
        type: "textarea",
        name: "text",
        description: "일기 쓰기",
    },
];

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
