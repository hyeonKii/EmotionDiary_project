import { useState } from "react";
import UserIDtoFind from "./UserIDtoFind";
import UserLogin from "./UserLogin";
import UserPWtoFind from "./UserPWtoFind";
import UserRegister from "./UserRegister";

export default function UserFormController() {
    const [tabNumber, setTabNumber] = useState(1);

    const LOGIN = 1;
    const REGISTER = 2;
    const FIND_ID = 3;
    const FIND_PW = 4;

    if (tabNumber === LOGIN) {
        return (
            <UserLogin
                setTabNumber={setTabNumber}
                tabList={{ LOGIN, REGISTER, FIND_ID, FIND_PW }}
            />
        );
    }

    if (tabNumber === REGISTER) {
        return <UserRegister setTabNumber={setTabNumber} tabList={{ LOGIN }} />;
    }

    if (tabNumber === FIND_ID) {
        return <UserIDtoFind setTabNumber={setTabNumber} tabList={{ REGISTER, FIND_PW }} />;
    }

    if (tabNumber === FIND_PW) {
        return (
            <UserPWtoFind
                setTabNumber={setTabNumber}
                tabList={{ LOGIN, REGISTER, FIND_ID, FIND_PW }}
            />
        );
    }

    return null;
}
