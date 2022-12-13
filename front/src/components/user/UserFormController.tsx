import { currentForm } from "@/temp/formAtom";
import { useRecoilValue } from "recoil";
import { FIND_ID, FIND_PW, LOGIN, REGISTER } from "./constants/tabList";
import UserIDtoFind from "./UserIDtoFind";
import UserLogin from "./UserLogin";
import UserPWtoFind from "./UserPWtoFind";
import UserRegister from "./UserRegister";

export default function UserFormController() {
    const tabNumber = useRecoilValue(currentForm);

    if (tabNumber === LOGIN) {
        return <UserLogin />;
    }

    if (tabNumber === REGISTER) {
        return <UserRegister />;
    }

    if (tabNumber === FIND_ID) {
        return <UserIDtoFind />;
    }

    if (tabNumber === FIND_PW) {
        return <UserPWtoFind />;
    }

    return null;
}
