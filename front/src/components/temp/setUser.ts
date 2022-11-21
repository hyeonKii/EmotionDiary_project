import axios from "axios";
import { useSetRecoilState } from "recoil";
import { currentUser } from "./atoms";

export default function setUser(accessToken: string, refreshToken: string): void {
    const setUser = useSetRecoilState(currentUser);

    axios.defaults.headers.common["Authorization"] = accessToken;
}
