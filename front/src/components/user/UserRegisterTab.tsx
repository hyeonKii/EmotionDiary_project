import React from "react";
import { LOGIN } from "./constants/tabList";
import Icon from "@/components/UI/Icon";
import {
    RegisterInputSection,
    InputBlock,
    FormButton,
    Error,
    BottomSection,
    SuccessRegister,
} from "@/styles/common/modal/Form-style";
import { happy } from "@/assets/images/index";
import { useSetRecoilState } from "recoil";
import { currentForm } from "@/temp/formAtom";

interface Props {
    form: {
        password: string;
        confirmPwd: string;
    };
    changeHandler(event: React.ChangeEvent<HTMLInputElement>): void;
    error: string;
    isSuccess: boolean;
}

export default function UserRegisterTab({ form, changeHandler, error, isSuccess }: Props) {
    const checkPassword = form.password !== form.confirmPwd ? true : false;

    const setCurrentForm = useSetRecoilState(currentForm);

    return (
        <>
            {!isSuccess ? (
                <>
                    <RegisterInputSection>
                        <InputBlock>
                            <label htmlFor="userID">
                                <Icon icon="userID" />
                            </label>
                            <input
                                id="userID"
                                type="text"
                                onChange={changeHandler}
                                placeholder="아이디"
                            />
                        </InputBlock>
                        {error && <Error>{error}</Error>}
                        <InputBlock>
                            <label htmlFor="nickname">
                                <Icon icon="userID" />
                            </label>
                            <input
                                id="nickname"
                                type="text"
                                onChange={changeHandler}
                                placeholder="닉네임"
                            />
                        </InputBlock>
                        <InputBlock>
                            <label htmlFor="certification">
                                <Icon icon="certification" />
                            </label>
                            <input
                                id="password"
                                type="password"
                                onChange={changeHandler}
                                placeholder="비밀번호"
                            />
                        </InputBlock>
                        <InputBlock>
                            <label htmlFor="certification">
                                <Icon icon="certification" />
                            </label>
                            <input
                                id="confirmPwd"
                                type="password"
                                onChange={changeHandler}
                                placeholder="비밀번호 확인"
                            />
                        </InputBlock>
                        {checkPassword && <Error>비밀번호가 일치하지 않습니다.</Error>}
                    </RegisterInputSection>
                    <BottomSection>
                        <FormButton>회원가입</FormButton>
                    </BottomSection>
                </>
            ) : (
                <>
                    <img src={happy} alt="happy" />
                    <SuccessRegister>회원가입에 성공하셨습니다!</SuccessRegister>

                    <FormButton type="button" onClick={() => setCurrentForm(LOGIN)}>
                        로그인 하기
                    </FormButton>
                </>
            )}
        </>
    );
}
