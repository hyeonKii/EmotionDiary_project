import { useState } from "react";
import UserLogin from "../user/UserLogin";
import ModalBackground from "./ModalBackground";

function Header() {
    const [showForm, setShowForm] = useState<boolean>(false);

    return (
        <>
            {showForm && (
                <>
                    <UserLogin />
                    {/* <ModalBackground setShowForm={setShowForm} /> */}
                </>
            )}
            <nav>
                <ul>
                    <li>
                        <button onClick={() => setShowForm(true)}>로그인</button>
                    </li>
                </ul>
            </nav>
        </>
    );
}

export default Header;
