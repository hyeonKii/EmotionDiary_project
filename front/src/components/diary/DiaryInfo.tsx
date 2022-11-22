import { useState } from "react";
import DiaryEdit from "./DiaryEdit";

function DiaryInfo({ key, diary }) {
    const [editMode, setEditMode] = useState<boolean>(false);

    return editMode ? (
        <DiaryEdit diary={diary} setEditMode={setEditMode} key={key} />
    ) : (
        <div key={key}>
            <div>{diary.title}</div>
            <div>{diary.description}</div>
            <div onClick={() => setEditMode(true)}>수정</div>
            <div>삭제</div>
        </div>
    );
}

export default DiaryInfo;
