import { useRequestCheckCode, useRequestSendCode } from "@/api/certificate";
import useForm from "@/hooks/useForm";
import { useState } from "react";

interface Response {
    data: {
        result: boolean;
    };
}

interface Props {
    setTab(value: boolean): void;
}

export default function UserEmailCheckTab({ setTab }: Props) {
    const [checkedEmail, setCheckedEmail] = useState(false);
    const { form, changeHandler } = useForm({ email: "", target: "email", code: "" });

    const { isError: emailError, mutate: sendCode } = useRequestSendCode(form, {
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
                setCheckedEmail(true);
            }
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
            <label htmlFor="email">가입하실 이메일을 입력해 주세요.</label>
            <div>
                <input id="email" type="email" placeholder="이메일" onChange={changeHandler} />
                <button type="button" onClick={sendCodeHandler}>
                    인증
                </button>
            </div>
            {emailError && <div>이미 가입된 이메일입니다.</div>}
            <label htmlFor="certifcation">이메일로 전송된 인증번호 여덟 자리를 입력해주세요.</label>
            <div>
                <input id="code" type="text" placeholder="인증번호 입력" onChange={changeHandler} />
                <button type="button" onClick={checkCodeHandler}>
                    확인
                </button>
            </div>
            {codeError && <div>올바르지 않은 인증번호 입니다.</div>}
            <button disabled={!checkedEmail} onClick={() => setTab(true)}>
                다음
            </button>
        </>
    );
}
