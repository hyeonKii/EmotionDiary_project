import { useSetRecoilState } from "recoil";
import useForm from "@/hooks/useForm";
import FormInput from "@/components/common/FormInput";
import { USER_LOGIN as endpoint } from "@/constants/requests";
import { USER_LOGIN as inputData, USER_LOGIN_INITIAL as initialState } from "@/constants/userInput";
import { currentUser } from "../temp/atoms";

export default function UserLogin() {
    const setUser = useSetRecoilState(currentUser);

    const { form, validatedForm, changeHandler, requestHandler } = useForm(initialState, endpoint);

    const submitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const { userID, email, nickname } = await requestHandler();
        setUser({ userID, email, nickname });
    };

    return (
        <form onSubmit={submitHandler}>
            <FormInput
                inputData={inputData}
                form={form}
                validatedForm={validatedForm}
                changeHandler={changeHandler}
            />
            <button>로그인</button>
        </form>
    );
}
