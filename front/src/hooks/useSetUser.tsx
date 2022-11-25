import { useFetchUser } from "@/api/account";

export default function useSetUser() {
    const { refetch: setUser } = useFetchUser(["user"], {
        enabled: false,
        retry: 3,

        onSuccess: (res) => {
            const {
                User: { nickname },
                certified_account,
            } = res.data;

            console.log("로그인 성공");

            setUser({ nickname });
        },

        onError: (error) => {
            console.log("로그인 실패 :" + error.message);
        },
    });

    return { setUser };
}
