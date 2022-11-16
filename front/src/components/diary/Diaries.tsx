import useFetch from "@/hooks/useFetch";
import { DIARY_CHECK } from "@/constants/requests";
import Diary from "./Diary";

export default function Diaries() {
    const { data, isLoading, isError } = useFetch("diaries", DIARY_CHECK);

    return <></>;
}
