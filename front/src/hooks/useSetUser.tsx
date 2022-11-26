import { useFetchUser } from "@/api/account";
import { currentUser } from "@/temp/userAtom";
import { useSetRecoilState } from "recoil";

interface Response {
    data: {
        User: { nickname: string };
        certified_account: boolean;
    };
}

interface Error {
    message: string;
}

export default function useSetUser() {
    const setUserState = useSetRecoilState(currentUser);

    const { refetch: setUser } = useFetchUser(["user"], {
        enabled: false,
        retry: 3,

        onSuccess: (res: Response) => {
            const {
                User: { nickname },
                certified_account,
            } = res.data;

            console.log("로그인 성공");

            setUserState({ nickname });
        },

        onError: (error: Error) => {
            console.log("로그인 실패 :" + error.message);
        },
    });

    return { setUser };
}
