import styled from "styled-components";
import {useState} from "react";
import useForm from "@/hooks/useForm";
import userRegisterValidation from "@/validations/UserRegisterValidation";
import FormInput from "@/components/common/FormInput";
import { USER_REGISTER } from "@/constants/requests";
import { InputDataType } from "@/types/inputData_type";
import { Link } from "react-router-dom";
import { ROUTES } from "@/routes/route";

const step1_inputData: InputDataType = [
    {
        type: "email",
        name: "email",
        description: "이메일",
    },
    {
        type: "password",
        name: "certification",
        description: "인증번호 입력",
    }
];

const step2_inputData: InputDataType = [
    {
        type: "text",
        name: "userID",
        description: "아이디",
    },
    {
        type: "text",
        name: "nickname",
        description: "별명",
    },
    {
        type: "password",
        name: "password",
        description: "비밀번호",
    },

    {
        type: "password",
        name: "correctPassword",
        description: "비밀번호 확인",
    },
];

const initialState = {
    email: "",
    certification: "",
    userID: "",
    nickname: "",
    password: "",
    correctPassword: ""
};



export default function RegisterForm() {
    const [tab, setTab] = useState<boolean>(false);
    const { form, validatedForm, onChangeHandler, onSubmitHandler } = useForm({
        initialState,
        endpoint: USER_REGISTER,
        validationFn: userRegisterValidation,
    });

    const inputData: InputDataType = !tab ? step1_inputData : step2_inputData;
      

    const props = {
        inputData,
        form,
        validatedForm,
        onChangeHandler,
    };
    

    return (
        <Form onSubmit={onSubmitHandler}>

            <FormTitle>Sign Up</FormTitle>

            <ModalTab>
                <ModalTabList onClick={() => setTab(false)}>
                    {"step1"}
                </ModalTabList>
                <ModalTabList onClick={() => setTab(true)}>
                    {"step2"}
                </ModalTabList>
            </ModalTab>
            
            <FormInput {...props}/>
            
            <FormButton>회원가입</FormButton>
            <ConfirmAccount>
                이미 계정이 있으신가요? {""}
                <Link to={ROUTES.LOGIN.path}
                style={{
                    textDecoration: "none",
                    color: "#47B5FF"
                }}>
                    로그인
                </Link>
            </ConfirmAccount>
        </Form>
    );
}



const Form = styled.form`
    width: 20%;
    min-width: 250px;
    height: 50%;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    box-shadow: 2px 2px 10px rgba(110, 110, 110, 1);
    z-index: 20;
    border-radius: 20px;

    background-color: white;  
`;

const FormTitle = styled.div`
    display: flex;
    margin-bottom: 20px;
    
    font-size: 2rem;
    font-weight: bold;
`

const ModalTab = styled.div`
    display: flex;
    margin-bottom: 25px;
`

const ModalTabList = styled.li`
    list-style: none;
    font-weight: bold;
    text-decoration: underline;
    color: black;

    + li {
        margin-left: 10px;
    }
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

const ConfirmAccount = styled.div`
    margin-top: 15px;

    font-size: 12px;
    font-weight: bold;
`
