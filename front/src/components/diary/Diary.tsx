import { useState } from "react";
import useRequest from "@/hooks/useRequest";
import { DIARY_EDIT, DIARY_DELETE } from "@/constants/types";

export default function Diary(data: object) {
    const [editMode, setEditMode] = useState(false);

    return editMode ? (
        <form></form>
    ) : (
        <div>
            <div>{data.type}</div>
            <div>{data.content}</div>
            <button>삭제</button>
        </div>
    );
}
