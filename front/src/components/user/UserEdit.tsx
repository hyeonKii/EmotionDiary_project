import { useRequestChangePwd } from "@/api/account";
import { useRequestDeleteUser, useRequestEditNickname } from "@/api/user";
import useForm from "@/hooks/useForm";
import useLogout from "@/hooks/useLogout";
import { currentUser } from "@/temp/userAtom";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import Icon from "../UI/Icon";

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
                console.log("닉네임 변경 성공");
                setUser({ nickname: form.nickname });
            },

            onError: (error: Error) => {
                console.log("닉네임 변경 실패: " + error.message);
            },
        }
    );

    const { isError: changePwdError, mutate: requestChangePwd } = useRequestChangePwd(
        { password: form.password },
        {
            onSuccess: () => {
                console.log("비밀번호 변경 성공");
            },

            onError: (error: Error) => {
                console.log("비밀번호 변경 실패: " + error.message);
            },
        }
    );

    const { isError: deleteUserError, mutate: requestDeleteUser } = useRequestDeleteUser({
        onSuccess: () => {
            console.log("탈퇴 성공");
        },

        onError: (error: Error) => {
            console.log("탈퇴 실패: " + error.message);
        },
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
        <FormStyle>
            <fieldset>
                <h2>내 정보</h2>
                <DescriptionLabel htmlFor="nickname">닉네임</DescriptionLabel>
                <InputSection>
                    <Icon icon="userID" />
                    <input
                        type="text"
                        id="nickname"
                        defaultValue={form.nickname}
                        onChange={changeHandler}
                    />
                </InputSection>
                <DescriptionLabel htmlFor="password">새 비밀번호</DescriptionLabel>
                <InputSection>
                    <Icon icon="password" />
                    <input type="password" id="password" onChange={changeHandler} />
                </InputSection>
                <DescriptionLabel>새 비밀번호 확인</DescriptionLabel>
                <InputSection>
                    <Icon icon="password" />
                    <input type="password" id="confirmPassword" onChange={changeHandler} />
                </InputSection>
                <LoginButtonStyle type="button" onClick={submitHandler}>
                    저장
                </LoginButtonStyle>
                <button type="button" onClick={deleteHandler}>
                    회원 탈퇴
                </button>
            </fieldset>
        </FormStyle>
    );
}

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
    }
`;

const InputSection = styled.div`
    width: 100%;
    margin-bottom: 1rem;
    position: relative;

    input {
        width: 100%;
        height: 2.5rem;

        border: 1px solid lightgray;
        border-radius: 8px;

        padding-left: 2rem;
    }
`;

const Error = styled.div`
    color: red;
    font-size: 0.8rem;
    margin-top: 0.5rem;
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

const DescriptionLabel = styled.label`
    display: inline-block;
    font-size: 0.8rem;
    margin-bottom: 0.5rem;
`;
