import { useRequestChangePwd } from "@/api/account";
import { useRequestDeleteUser, useRequestEditNickname } from "@/api/user";
import useForm from "@/hooks/useForm";
import useLogout from "@/hooks/useLogout";
import { currentUser } from "@/temp/userAtom";
import { useRecoilValue } from "recoil";

interface Props {
    setEditMode(value: boolean): void;
}

interface Error {
    message: string;
}

export default function UserEdit({ setEditMode }: Props) {
    const user = useRecoilValue(currentUser);

    const { form, changeHandler } = useForm({
        nickname: user?.nickname,
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

    // const { isError: deleteUserError, mutate: requestDeleteUser } = useRequestDeleteUser(
    //     { userID: user.userID },
    //     {
    //         onSuccess: () => {
    //             console.log("탈퇴 성공");
    //         },

    //         onError: (error: Error) => {
    //             console.log("탈퇴 실패: " + error.message);
    //         },
    //     }
    // );

    const submitHandler = () => {
        if (user?.nickname !== form.nickname) {
            requestEditNickname();
        }

        if (form.password && form.confirmPassword) {
            requestChangePwd();
            logout();
        }

        setEditMode(false);
    };

    // const deleteHandler = () => {
    //     requestDeleteUser();
    //     setEditMode(false);
    //     logout();
    // };

    return (
        <>
            <input
                type="text"
                id="nickname"
                defaultValue={form.nickname}
                onChange={changeHandler}
            />
            <input type="password" id="password" onChange={changeHandler} />
            <input type="password" id="confirmPassword" onChange={changeHandler} />
            <div>{}</div>
            <button type="button" onClick={submitHandler}>
                저장
            </button>
            <button type="button" onClick={() => setEditMode(false)}>
                취소
            </button>
            {/* <button type="button" onClick={deleteHandler}>
                회원 탈퇴
            </button> */}
        </>
    );
}
