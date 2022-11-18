import styled from "styled-components";
import useForm from "@/hooks/useForm";
import FormInput from "@/components/common/FormInput";
import { USER_LOGIN } from "@/constants/requests";
import { InputDataType } from "@/types/inputData_type";
import { useSetRecoilState } from "recoil";
import { currentUser } from "../temp/atoms";

const inputData: InputDataType = [
    {
        type: "text",
        name: "userID",
        description: "아이디",
    },
    {
        type: "password",
        name: "password",
        description: "비밀번호",
    },
];

const initialState = {
    userID: "",
    password: "",
};

export default function UserLoginForm() {
    const setUser = useSetRecoilState(currentUser);

    const { form, validatedForm, onChangeHandler, requestHandler } = useForm({
        initialState,
        endpoint: USER_LOGIN,
    });

    const onSubmitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const { userID, email, nickname } = await requestHandler();
        setUser({ userID, email, nickname });
    };

    const props = {
        inputData,
        form,
        validatedForm,
        onChangeHandler,
    };

    return (
        <Form onSubmit={onSubmitHandler}>
            <FormInput {...props} />
            <button>로그인</button>
        </Form>
    );
}

const Form = styled.form`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 20;
    background-color: white;
    height: 50%;
    width: 20%;
`;
