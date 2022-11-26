interface Props {
    user: { nickname: string | null };
    setEditMode(value: boolean): void;
}

export default function UserInfo({ user, setEditMode }: Props) {
    return (
        <div>
            <div>{user.nickname}</div>
            <button type="button" onClick={() => setEditMode(true)}>
                수정
            </button>
        </div>
    );
}
