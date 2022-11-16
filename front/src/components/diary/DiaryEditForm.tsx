import { useState } from "react";
import useRequest from "@/hooks/useRequest";
import { DIARY_EDIT, DIARY_DELETE } from "@/constants/requests";

export default function DiaryEditForm(data: object) {
    const [editMode, setEditMode] = useState(false);
}
