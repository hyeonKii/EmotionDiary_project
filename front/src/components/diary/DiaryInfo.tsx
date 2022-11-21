export default function DiaryInfo({ data }) {
    return (
        <div>
            <div>{data.title}</div>
            <div>{data.description}</div>
            <div onClick={() => setEditMode(true)}>수정</div>
            <div>삭제</div>
        </div>
    );
}
