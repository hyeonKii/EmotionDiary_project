export default function UserInfo({ user, setEditMode }) {
    return (
        <div>
            <div>{user.nickname}</div>
            <button type="button" onClick={() => setEditMode(true)}>
                수정
            </button>
        </div>
    );
}
