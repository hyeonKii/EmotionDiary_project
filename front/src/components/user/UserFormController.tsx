import { useState } from "react";
import { FIND_ID, FIND_PW, LOGIN, REGISTER } from "./constants/tabList";
import UserIDtoFind from "./UserIDtoFind";
import UserLogin from "./UserLogin";
import UserPWtoFind from "./UserPWtoFind";
import UserRegister from "./UserRegister";

interface Props {
    setShowLoginForm(value: boolean): void;
}

export default function UserFormController({ setShowLoginForm }: Props) {
    const [tabNumber, setTabNumber] = useState(LOGIN);

    if (tabNumber === LOGIN) {
        return <UserLogin setTabNumber={setTabNumber} setShowLoginForm={setShowLoginForm} />;
    }

    if (tabNumber === REGISTER) {
        return <UserRegister setTabNumber={setTabNumber} />;
    }

    if (tabNumber === FIND_ID) {
        return <UserIDtoFind setTabNumber={setTabNumber} />;
    }

    if (tabNumber === FIND_PW) {
        return <UserPWtoFind setTabNumber={setTabNumber} />;
    }

    return null;
}
