import useRequest from "@/hooks/useRequest";
import { DIARY_EDIT } from "@/constants/requests";

interface Props {
    data: { type: string; title: string; content: string };
    setEditMode(value: boolean): boolean;
}

export default function DiaryEditForm({ data, setEditMode }: Props) {
    return <></>;
}
