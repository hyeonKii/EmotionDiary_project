import { useRecoilState } from "recoil";

import { useRequestChangePwd } from "@/api/account";
import { useRequestDeleteUser, useRequestEditNickname } from "@/api/user";
import useForm from "@/hooks/useForm";
import useLogout from "@/hooks/useLogout";
import { currentUser } from "@/temp/userAtom";
import Icon from "@/components/UI/Icon";
import {
    Form,
    FormTitle,
    FormButton,
    EditSection,
    InputBlock,
    Error,
} from "@/styles/common/modal/Form-style";

interface Props {
    setShowInfo(value: boolean): void;
    setShowDropDown(value: boolean): void;
}

interface Error {
    message: string;
}

export default function UserEdit({ setShowInfo, setShowDropDown }: Props) {
    const [user, setUser] = useRecoilState(currentUser);

    const { form, changeHandler } = useForm({
        nickname: user?.nickname as string,
        password: "",
        confirmPassword: "",
    });

    const { logout } = useLogout();

    const { mutate: requestEditNickname } = useRequestEditNickname(
        {
            nickname: form.nickname,
        },
        {
            onSuccess: () => {
                setUser({ nickname: form.nickname });
            },

            onError: (error: Error) => {},
        }
    );

    const { isError: changePwdError, mutate: requestChangePwd } = useRequestChangePwd(
        { password: form.password },
        {
            onSuccess: () => {},

            onError: (error: Error) => {},
        }
    );

    const { isError: deleteUserError, mutate: requestDeleteUser } = useRequestDeleteUser({
        onSuccess: () => {},

        onError: (error: Error) => {},
    });

    const submitHandler = () => {
        if (user?.nickname !== form.nickname) {
            requestEditNickname();
        }

        if (form.password && form.confirmPassword) {
            requestChangePwd();
            logout();
        }

        setShowInfo(false);
    };

    const deleteHandler = () => {
        requestDeleteUser();
        setShowInfo(false);
        setShowDropDown(false);
        logout();
    };

    return (
        <Form>
            <FormTitle>내 정보</FormTitle>
            <button onClick={() => setShowInfo(false)} className="material-symbols-outlined">
                close
            </button>
            <EditSection>
                <InputBlock>
                    <label htmlFor="nickname">닉네임</label>
                    <Icon icon="userID" />
                    <input
                        type="text"
                        id="nickname"
                        defaultValue={form.nickname}
                        onChange={changeHandler}
                    />
                </InputBlock>
                <InputBlock>
                    <label htmlFor="password">새 비밀번호</label>
                    <Icon icon="password" />
                    <input type="password" id="password" onChange={changeHandler} />
                </InputBlock>
                <InputBlock>
                    <label>새 비밀번호 확인</label>
                    <Icon icon="password" />
                    <input type="password" id="confirmPassword" onChange={changeHandler} />
                </InputBlock>
            </EditSection>
            <FormButton type="button" onClick={submitHandler}>
                저장
            </FormButton>
            <button className="deleteButton" type="button" onClick={deleteHandler}>
                회원 탈퇴
            </button>
        </Form>
    );
}
