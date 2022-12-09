import { useRequestLogout } from "@/api/account";
import { currentUser } from "@/temp/userAtom";
import setSession from "@/util/setSession";
import { useSetRecoilState } from "recoil";

interface Data {
    data: { ok: boolean };
}

interface Error {
    message: string;
}

export default function useLogout() {
    const setUser = useSetRecoilState(currentUser);

    const { mutate: logoutRequest } = useRequestLogout({
        onSuccess: (res: Data) => {
            const { ok } = res.data;

            if (ok) {
                setUser(null);
                setSession("accessToken", "");
                setSession("refreshToken", "");
                location.reload();
            }
        },

        onError: (error: Error) => {
            console.log(error.message);
        },
    });

    const logout = () => {
        logoutRequest();
    };

    return { logout };
}
