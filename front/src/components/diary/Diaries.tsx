import useFetch from "@/hooks/useFetch";
import { DIARY_CHECK } from "@/constants/types";
import Diary from "./Diary";

export default function Diaries() {
    const { data, isLoading, isError } = useFetch("diaries", DIARY_CHECK);

    return (
        !isLoading &&
        !isError &&
        data.map((diary) => {
            return <Diary data={diary} />;
        })
    );
}
