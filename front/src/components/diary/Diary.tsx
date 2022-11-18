import { useState } from "react";
import DiaryEditForm from "./DiaryEditForm";

export default function Diary({ data }) {
    const [editMode, setEditMode] = useState(false);

    return !editMode ? (
        <div>
            <div>{data.title}</div>
            <div>{data.description}</div>
            <div onClick={() => setEditMode(true)}>수정</div>
            <div>삭제</div>
        </div>
    ) : (
        <DiaryEditForm data={data} setEditMode={setEditMode} />
    );
}
