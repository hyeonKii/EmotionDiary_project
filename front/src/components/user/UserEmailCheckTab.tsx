import { useState } from "react";
import useForm from "@/hooks/useForm";
import { useRequestCheckCode, useRequestSendCode } from "@/api/certificate";
import Icon from "@/components/UI/Icon";
import {
    InputSection,
    InputBlock,
    FormButton,
    Error,
    BottomSection,
    AuthButton,
    CorrectButton,
    Success,
    DescriptionLabel,
} from "@/styles/common/modal/Form-style";

interface Response {
    data: {
        result: boolean;
    };
}

interface Error {
    message: string;
    response: {
        data: string;
    };
}

interface Props {
    setTab(value: boolean): void;
    setRequiredEmail(value: string): void;
}

export default function UserEmailCheckTab({ setTab, setRequiredEmail }: Props) {
    const [checkedEmail, setCheckedEmail] = useState(false);
    const [codeError, setCodeError] = useState("");
    const [checkError, setCheckError] = useState(false);

    const { form, changeHandler } = useForm({ email: "", target: "email", code: "" });

    const { isSuccess: emailSuccess, mutate: sendCode } = useRequestSendCode(form, {
        onSuccess: () => {
            console.log("이메일 코드 전송 완료.");
            setCodeError("");
        },
        onError: (error) => {
            console.log("이메일 코드 전송 실패 :" + error.message);

            if (error.response?.data === "User already exists") {
                setCodeError("이미 해당 이메일로 가입되었습니다.");
                return;
            }
            setCodeError("인증번호 전송이 실패했습니다.");
        },
    });

    const { mutate: checkCode } = useRequestCheckCode(form, {
        onSuccess: (res: Response) => {
            const { result } = res.data;

            if (result) {
                setCheckError(false);
                setCheckedEmail(true);
                setRequiredEmail(form.email);
                return;
            }
            setCheckError(true);
            setCheckedEmail(false);
        },
        onError: () => {
            console.log("코드 인증 요청 실패");
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
                <InputBlock>
                    <DescriptionLabel htmlFor="email">
                        가입하실 이메일을 입력해 주세요.
                    </DescriptionLabel>
                    <Icon icon="email" />
                    <input id="email" type="email" placeholder="이메일" onChange={changeHandler} />
                    <AuthButton type="button" onClick={sendCodeHandler}>
                        인증
                    </AuthButton>
                </InputBlock>
                {emailSuccess && <Success>코드가 전송되었습니다.</Success>}
                {codeError && <Error>{codeError}</Error>}
            </InputSection>
            <InputSection>
                <InputBlock>
                    <DescriptionLabel htmlFor="certifcation">
                        이메일로 전송된 인증번호 8자리를 입력해주세요.
                    </DescriptionLabel>
                    <Icon icon="certification" />
                    <input
                        id="code"
                        type="text"
                        placeholder="인증번호 입력"
                        onChange={changeHandler}
                    />
                    <CorrectButton type="button" onClick={checkCodeHandler}>
                        확인
                    </CorrectButton>
                </InputBlock>

                {checkedEmail && <Success>코드가 확인되었습니다.</Success>}
                {checkError && <Error>올바르지 않은 인증번호 입니다.</Error>}
            </InputSection>

            <BottomSection>
                <FormButton type="button" disabled={!checkedEmail} onClick={() => setTab(true)}>
                    다음
                </FormButton>
            </BottomSection>
        </>
    );
}
