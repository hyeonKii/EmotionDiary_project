import { useState } from "react";
import { QueryClient } from "react-query";
import UserEdit from "./UserEdit";
import UserInfo from "./UserInfo";

function User() {
    const [editMode, setEditMode] = useState<boolean>(false);

    const queryClient = new QueryClient();
    const user = queryClient.getQueryData(["user"]);

    if (!user) {
        return null;
    }

    return editMode ? (
        <UserEdit user={user} setEditMode={setEditMode} />
    ) : (
        <UserInfo user={user} setEditMode={setEditMode} />
    );
}

export default User;
