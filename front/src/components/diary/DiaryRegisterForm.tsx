import useForm from "../../hooks/useForm";

import FormInput from "../user/FormInput";

import { DIARY_REGISTER } from "../../constants/Types";

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
            <div>{`최대 글자 수 ${form.text.length} / 10`}</div>
            {form.text.length > 10 && <div>최대 글자 수를 초과했습니다.</div>}
            <button>저장</button>
        </form>
    );
}
