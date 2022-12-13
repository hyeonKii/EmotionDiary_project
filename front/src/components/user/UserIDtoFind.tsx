import { useState } from "react";
import useForm from "@/hooks/useForm";
import { useRequestFindID } from "@/api/account";
import { useRequestSendCode } from "@/api/certificate";
import { FIND_PW, LOGIN, REGISTER } from "./constants/tabList";
import Icon from "@/components/UI/Icon";
import {
    Form,
    FormTitle,
    InputSection,
    InputBlock,
    FormButton,
    BottomSection,
    IDStyle,
    AuthButton,
    CorrectButton,
    FindError,
    Success,
    DescriptionLabel,
} from "@/styles/common/modal/Form-style";
import { useSetRecoilState } from "recoil";
import { currentForm } from "@/temp/formAtom";

interface IDResponse {
    data: string;
}

export default function UserIDtoFind() {
    const [id, setId] = useState("");
    const [emailError, setEmailError] = useState("");
    const [codeError, setCodeError] = useState("");

    const setCurrentForm = useSetRecoilState(currentForm);

    const { form, changeHandler } = useForm({ email: "", target: "id", code: "" });

    const { isSuccess: emailSuccess, mutate: sendCode } = useRequestSendCode(form, {
        onSuccess: () => {
            console.log("이메일 코드 전송 완료.");
            setEmailError("");
        },
        onError: (error) => {
            console.log("이메일 전송 실패");

            if (error.response?.data === "User does not exists") {
                setEmailError("아이디가 존재하지 않습니다.");
                return;
            }

            setEmailError("코드 전송이 실패했습니다. 다시 한번 확인해주세요.");
        },
    });

    const { isSuccess: codeSuccess, mutate: findID } = useRequestFindID(
        { email: form.email, code: form.code },
        {
            onSuccess: (res: IDResponse) => {
                console.log(res);

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

    const sendCodeHandler = () => {
        sendCode();
    };

    const checkCodeHandler = () => {
        findID();
    };
    return (
        <Form>
            <FormTitle>아이디 찾기</FormTitle>
            <InputSection>
                <InputBlock>
                    <DescriptionLabel>가입하신 이메일을 입력해주세요.</DescriptionLabel>
                    <Icon icon="email" />
                    <input id="email" type="email" placeholder="이메일" onChange={changeHandler} />
                    <AuthButton type="button" onClick={sendCodeHandler}>
                        인증
                    </AuthButton>
                </InputBlock>
                {emailSuccess && <Success>코드가 전송되었습니다.</Success>}
                {emailError && <FindError>{emailError}</FindError>}
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

                {codeSuccess && <Success>코드가 확인되었습니다.</Success>}
                {codeError && <FindError>{codeError}</FindError>}
            </InputSection>
            {id && (
                <IDStyle>
                    아이디는 <span>{id}</span>입니다.
                </IDStyle>
            )}
            <BottomSection>
                <FormButton onClick={() => setCurrentForm(LOGIN)}>로그인 하기</FormButton>
                <div className="register">
                    <span>계정이 없으신가요? </span>
                    <button type="button" onClick={() => setCurrentForm(REGISTER)}>
                        회원가입
                    </button>
                </div>
                <button type="button" onClick={() => setCurrentForm(FIND_PW)}>
                    비밀번호 찾기
                </button>
            </BottomSection>
        </Form>
    );
}
