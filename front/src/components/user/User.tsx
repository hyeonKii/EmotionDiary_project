import { currentUser } from "@/temp/userAtom";
import { useState } from "react";
import { useRecoilValue } from "recoil";
import UserEdit from "./UserEdit";
import UserInfo from "./UserInfo";

export default function User() {
    const [editMode, setEditMode] = useState(false);
    const user = useRecoilValue(currentUser);

    if (!user) {
        return null;
    }

    return editMode ? (
        <UserEdit setEditMode={setEditMode} />
    ) : (
        <UserInfo user={user} setEditMode={setEditMode} />
    );
}
