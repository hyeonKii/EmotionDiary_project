import { useState } from "react";
import { useRecoilValue } from "recoil";
import { currentUser } from "../temp/atoms";
import UserInfo from "./UserInfo";
import UserEdit from "./UserEdit";

export default function User() {
    const user = useRecoilValue(currentUser);
    const [editMode, setEditMode] = useState(false);

    return !editMode ? (
        <UserInfo user={user} setEditMode={setEditMode} />
    ) : (
        <UserEdit user={user} setEditMode={setEditMode} />
    );
}
