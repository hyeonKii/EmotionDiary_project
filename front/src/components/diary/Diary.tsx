import { useState } from "react";
import DiaryInfo from "./DiaryInfo";
import DiaryEdit from "./DiaryEdit";

export default function Diary({ data }) {
    const [editMode, setEditMode] = useState(false);

    return !editMode ? (
        <DiaryInfo data={data} setEditMode={setEditMode} />
    ) : (
        <DiaryEdit data={data} setEditMode={setEditMode} />
    );
}
