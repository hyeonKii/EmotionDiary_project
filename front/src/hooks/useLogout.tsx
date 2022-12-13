import { useRequestLogout } from "@/api/account";
import { showLoginForm } from "@/temp/formAtom";
import { currentUser } from "@/temp/userAtom";
import { removeSession } from "@/util/setSession";
import { useSetRecoilState } from "recoil";

interface Data {
    data: { ok: boolean };
}

interface Error {
    message: string;
}

export default function useLogout() {
    const setUser = useSetRecoilState(currentUser);
    const setLoginForm = useSetRecoilState(showLoginForm);

    const { mutate: logoutRequest } = useRequestLogout({
        onSuccess: (res: Data) => {
            const { ok } = res.data;

            if (ok) {
                setUser(null);
                setLoginForm(true);

                removeSession("accessToken");
                removeSession("refreshToken");
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
