import { useRequestFindID } from "@/api/account";
import { useRequestCheckCode, useRequestSendCode } from "@/api/certificate";
import useForm from "@/hooks/useForm";
import { useState } from "react";
import styled from "styled-components";
import Icon from "../UI/Icon";

interface Response {
    data: {
        result: boolean;
    };
}

interface Props {
    setTabNumber(value: number): void;
    tabList: { REGISTER: number; LOGIN: number; FIND_PW: number };
}

interface IDResponse {
    data: string;
}

interface Error {
    response: {
        data: string;
    };
}

export default function UserIDtoFind({ setTabNumber, tabList }: Props) {
    const [id, setId] = useState("");
    const [emailError, setEmailError] = useState("");
    const [codeError, setCodeError] = useState("");

    const { form, changeHandler } = useForm({ email: "", target: "id", code: "" });

    const { isSuccess: codeSuccess, mutate: findID } = useRequestFindID(
        { email: form.email, code: form.code },
        {
            onSuccess: (res: IDResponse) => {
                const { data } = res;

                if (data) {
                    setId(data);
                    setCodeError("");
                    return;
                }

                setCodeError("확인된 아이디가 없습니다. 다시 한번 확인해주세요.");
            },
            onError: () => {
                console.log("아이디 찾기 실패");
                setCodeError("확인 요청이 실패했습니다.");
            },
        }
    );

    const { isSuccess: emailSuccess, mutate: sendCode } = useRequestSendCode(form, {
        onSuccess: () => {
            console.log("이메일 코드 전송 완료.");
        },
        onError: (error: Error) => {
            console.log("이메일 전송 실패");

            if (error.response.data === "User does not exists") {
                setEmailError("아이디가 존재하지 않습니다.");
                return;
            }

            setEmailError("코드 전송이 실패했습니다. 다시 한번 확인해주세요.");
        },
    });

    const sendCodeHandler = () => {
        sendCode();
    };

    const checkCodeHandler = () => {
        findID();
    };
    return (
        <FormStyle>
            <fieldset>
                <h2>아이디 찾기</h2>
                <InputSection>
                    <DescriptionLabel>가입하신 이메일을 입력해주세요.</DescriptionLabel>
                    <InputField>
                        <Icon icon="email" />
                        <input
                            id="email"
                            type="email"
                            placeholder="이메일"
                            onChange={changeHandler}
                        />
                        <Button type="button" onClick={sendCodeHandler}>
                            인증
                        </Button>
                    </InputField>
                    {emailSuccess && <Success>코드가 전송되었습니다.</Success>}
                    {emailError && <Error>{emailError}</Error>}
                </InputSection>
                <InputSection>
                    <DescriptionLabel htmlFor="certifcation">
                        이메일로 전송된 인증번호 여덟 자리를 입력해주세요.
                    </DescriptionLabel>
                    <InputField>
                        <Icon icon="certification" />
                        <input
                            id="code"
                            type="text"
                            placeholder="인증번호 입력"
                            onChange={changeHandler}
                        />
                        <Button type="button" onClick={checkCodeHandler}>
                            확인
                        </Button>
                    </InputField>
                    {codeSuccess && <Success>코드가 확인되었습니다.</Success>}
                    {codeError && <Error>{codeError}</Error>}
                </InputSection>
                {id && (
                    <IDStyle>
                        아이디는 <span>{id}</span>입니다.
                    </IDStyle>
                )}
                <LoginButtonStyle onClick={() => setTabNumber(tabList.LOGIN)}>
                    로그인 하기
                </LoginButtonStyle>
                <BottomSectionStyle>
                    <BottomRegisterStyle>
                        <span>계정이 없으신가요? </span>
                        <Register>
                            <button type="button" onClick={() => setTabNumber(tabList.REGISTER)}>
                                회원가입
                            </button>
                        </Register>
                    </BottomRegisterStyle>
                    <BottomFindSomethingStyle>
                        <span>
                            <button type="button" onClick={() => setTabNumber(tabList.FIND_PW)}>
                                비밀번호 찾기
                            </button>
                        </span>
                    </BottomFindSomethingStyle>
                </BottomSectionStyle>
            </fieldset>
        </FormStyle>
    );
}

const IDStyle = styled.div`
    span {
        color: lightblue;
    }
`;

const Button = styled.button`
    width: 17.5%;
    border-radius: 0 12px 12px 0;
    height: 2.5rem;
    background-color: lightblue;
    color: white;
`;

const FormStyle = styled.form`
position: fixed;
top: 50%;
left: 50%;
transform: translate(-50%, -50%);

box-shadow: 2px 2px 10px rgba(110, 110, 110, 1);
z-index: 20;
border-radius: 20px;
background-color: white;
height: 55%;
width: 25%;
min-width: 250px;
min-height: 460px;

display: flex;
flex-direction: row;
align-items: center;
justify-content: center;

fieldset {
    width: 70%;
    height: 100%;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    border: none;

    h2 {
        margin-bottom: 3rem;
    }

`;

const LoginButtonStyle = styled.button`
    width: 100%;
    height: 2.5rem;

    margin-top: 2rem;
    margin-bottom: 1.5rem;

    color: white;
    border: none;
    border-radius: 8px;
    background-color: ${(props) => (props.disabled ? "gray" : "lightblue")};
`;

const ErrorStyle = styled.div`
    color: red;
    font-size: 0.9rem;
`;

const BottomSectionStyle = styled.div`
    font-size: 0.8rem;
    text-align: center;
`;

const BottomRegisterStyle = styled.div`
    margin-bottom: 0.5rem;
`;

const Register = styled.span`
    button {
        font-size: 0.9rem;
        color: lightblue;
    }
`;

const BottomFindSomethingStyle = styled.div`
    color: lightblue;

    button {
        color: lightblue;
    }
`;

const InputField = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
`;

const Error = styled.div`
    color: red;
    font-size: 0.8rem;
    margin-top: 0.5rem;
`;

const Success = styled.div`
    color: blue;
    font-size: 0.8rem;
    margin-top: 0.5rem;
`;

const InputSection = styled.div`
    width: 100%;
    margin-bottom: 2rem;

    input {
        width: 80%;
        height: 2.5rem;

        border: 1px solid lightgray;
        border-radius: 8px 0 0 8px;

        padding-left: 2rem;
    }

    div {
        position: relative;
    }
`;

const DescriptionLabel = styled.label`
    display: inline-block;
    font-size: 0.8rem;
    margin-bottom: 0.5rem;
`;
