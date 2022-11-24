import styled, {keyframes} from "styled-components";
import useForm from "@/hooks/useForm";
import FormInput from "@/components/common/FormInput";
import { USER_LOGIN } from "@/api/constants/userEndpoints";
import { InputDataType } from "@/types/inputData_type";
import {atom, useSetRecoilState} from "recoil";
import { Link } from "react-router-dom";
import { ROUTES } from "@/routes/route";

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

const currentUser = atom({
    key: "currentUser",
    default: {},
})

export default function UserLoginForm() {
    const setUser = useSetRecoilState(currentUser);
    const { form, validatedForm, onChangeHandler, requestHandler } = useForm({
        initialState,
        endpoint: USER_LOGIN,
    });

    const onSubmitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const fetchedData: any = requestHandler();
        console.log(fetchedData);
        setUser(fetchedData);
    
    };

    const props = {
        inputData,
        form,
        validatedForm,
        onChangeHandler,
    };

    return (
        <Form onSubmit={onSubmitHandler}>
            <FormTitle>Sign In</FormTitle>
            <FormInput {...props} />
            
            <FormButton>로그인</FormButton>

            <AccountMessage>
                계정이 없으신가요? {""}
                <Link to={ROUTES.REGISTER.path}
                style={{
                    textDecoration: "none",
                    color: "#47B5FF"
                    }}
                >회원가입
                </Link>
            </AccountMessage>

            <FindMessage>
                <Link to={ROUTES.FINDID.path}
                style={{
                    textDecoration: "none",
                    color: "#47B5FF"
                    }}
                >아이디
                </Link>
                {""} / {""} 
                <Link to={ROUTES.FINDPW.path}
                style={{
                    textDecoration: "none",
                    color: "#47B5FF"
                    }}
                >비밀번호 찾기
                </Link>
            </FindMessage>
        </Form>
    );
}

const smoothAppear = keyframes`
    0% {
        opacity: 0;
        transform: translate(-50%, -50%);
    to {
        opacity: 1;
        transform: translate(0);
    }
    }
`

const Form = styled.form`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    animation: ${smoothAppear} 1s;
    box-shadow: 2px 2px 10px rgba(110, 110, 110, 1);
    z-index: 20;
    border-radius: 20px;
    background-color: white;
    height: 50%;
    width: 20%;
    min-width: 250px;
`;

const FormTitle = styled.div`
    margin-bottom: 60px;
    font-size: 2rem;
    font-weight: bold;
`

const FormButton = styled.button`
    width: 12rem;
    height: 2rem;
    margin-top: 15px;
    outline: none;
    border: none;
    border-radius: 4px;
    font-size: 12px;
    background-color: #47B5FF;
    color: white;
`

const AccountMessage = styled.div`
    margin-top: 15px;
    font-size: 12px;
    font-weight: bold;
`

const FindMessage = styled.div`
    margin-top: 5px;
    font-size: 12px;
    font-weight: bold;
    color: #26ADE8;
`