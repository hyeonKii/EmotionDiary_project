export default function UserInfo({ user, setEditMode }) {
    return (
        <div>
            <div>{user.userID}</div>
            <div>{user.nickname}</div>
            <div>{user.email}</div>
            <button type="button" onClick={() => setEditMode(true)}>
                수정
            </button>
            <button type="button">삭제</button>
        </div>
    );
}
