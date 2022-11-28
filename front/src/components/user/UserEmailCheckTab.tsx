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
    setTab(value: boolean): void;
    setEmail(value: string): void;
}

export default function UserEmailCheckTab({ setTab, setEmail }: Props) {
    const [checkedEmail, setCheckedEmail] = useState(false);
    const [error, setError] = useState(false);

    const { form, changeHandler } = useForm({ email: "", target: "email", code: "" });

    const {
        isError: emailError,
        isSuccess: emailSuccess,
        mutate: sendCode,
    } = useRequestSendCode(form, {
        onSuccess: () => {
            console.log("이메일 코드 전송 완료.");
        },
        onError: () => {
            console.log("이메일 전송 실패");
        },
    });

    const { isError: codeError, mutate: checkCode } = useRequestCheckCode(form, {
        onSuccess: (res: Response) => {
            const { result } = res.data;

            if (result) {
                setError(false);
                setCheckedEmail(true);
                setEmail;
                return;
            }
            setError(true);
            setCheckedEmail(false);
        },
        onError: () => {
            console.log("코드 인증 실패");
        },
    });

    const sendCodeHandler = () => {
        sendCode();
    };

    const checkCodeHandler = () => {
        checkCode();
    };

    return (
        <>
            <InputSection>
                <DescriptionLabel htmlFor="email">
                    가입하실 이메일을 입력해 주세요.
                </DescriptionLabel>
                <InputField>
                    <Icon icon="email" />
                    <input id="email" type="email" placeholder="이메일" onChange={changeHandler} />
                    <Button type="button" onClick={sendCodeHandler}>
                        인증
                    </Button>
                </InputField>
                {emailSuccess && <Success>코드가 전송되었습니다.</Success>}
                {emailError && <Error>이미 가입된 이메일이거나 코드가 전송된 상태입니다.</Error>}
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
                {checkedEmail && <Success>코드가 확인되었습니다.</Success>}
                {codeError && <Error>확인 요청이 실패했습니다.</Error>}
                {error && <Error>올바르지 않은 인증번호 입니다.</Error>}
            </InputSection>
            <LoginButtonStyle type="button" disabled={!checkedEmail} onClick={() => setTab(true)}>
                다음
            </LoginButtonStyle>
        </>
    );
}

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

const Button = styled.button`
    width: 17.5%;
    border-radius: 0 12px 12px 0;
    height: 2.5rem;
    background-color: lightblue;
    color: white;
`;

const DescriptionLabel = styled.label`
    display: inline-block;
    font-size: 0.8rem;
    margin-bottom: 0.5rem;
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
