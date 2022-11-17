import { useState } from "react";
import useRequest from "@/hooks/useRequest";
import DiaryEditForm from "./DiaryEditForm";

interface Props {
    data: { type: string; title: string; content: string };
}

export default function Diary({ data }: Props) {
    const [editMode, setEditMode] = useState<boolean>(false);

    return !editMode ? (
        <div>
            <div>{data.type}</div>
            <div>{data.title}</div>
            <div>{data.content}</div>
            <div onClick={() => setEditMode(true)}>수정</div>
            <div>삭제</div>
        </div>
    ) : (
        <DiaryEditForm data={data} setEditMode={setEditMode} />
    );
}
