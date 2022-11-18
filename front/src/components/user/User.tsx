import { useRecoilValue } from "recoil";
import { currentUser } from "../temp/atoms";

export default function User() {
    const user = useRecoilValue(currentUser);

    return (
        <>
            <div>{user.userID}</div>
            <div>{user.email}</div>
            <div>{user.nickname}</div>
        </>
    );
}
