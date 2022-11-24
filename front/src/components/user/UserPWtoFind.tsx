import styled from "styled-components";
import useForm from "@/hooks/useForm";
import userRegisterValidation from "@/validations/UserRegisterValidation";
import FormInput from "@/components/common/FormInput";
import { USER_REGISTER } from "@/constants/requests";
import { InputDataType } from "@/types/inputData_type";
import { Link } from "react-router-dom";
import { ROUTES } from "@/routes/route";

const inputData: InputDataType = [
    {
        type: "email",
        name: "email",
        description: "이메일",
    },

];

const initialState = {
    email: "",
};


export default function UserIDtoFInd() {
  const { form, validatedForm, onChangeHandler, onSubmitHandler } = useForm({
      initialState,
      endpoint: USER_REGISTER,
      validationFn: userRegisterValidation,
  });

  const props = {
      inputData,
      form,
      validatedForm,
      onChangeHandler,
  };

    return (
        <Form onSubmit={onSubmitHandler}>
            <FormTitle>비밀번호 찾기</FormTitle>
            <FormInput {...props} />
            
            <FormButton>로그인 하기</FormButton>

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
              >
                아이디 찾기
              </Link>
            </FindMessage>
            
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