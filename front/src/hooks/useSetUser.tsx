import { useFetchUser } from "@/api/account";
import { currentUser } from "@/temp/userAtom";
import { useSetRecoilState } from "recoil";

interface Response {
    data: {
        User: { nickname: string; id: number };
        certified_account: boolean;
    };
}

interface Error {
    message: string;
}

export default function useSetUser() {
    const setUserState = useSetRecoilState(currentUser);

    const { isLoading, refetch: setUser } = useFetchUser(["user"], {
        enabled: false,
        retry: false,

        onSuccess: (res: Response) => {
            const {
                User: { nickname, id },
                certified_account,
            } = res.data;

            console.log("로그인 성공");

            setUserState({ nickname, id });
        },

        onError: (error: Error) => {
            console.log("로그인 실패 :" + error.message);
        },
    });

    return { isLoading, setUser };
}
