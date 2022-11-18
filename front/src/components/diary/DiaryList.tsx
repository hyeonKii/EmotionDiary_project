import useFetch from "@/hooks/useFetchData";
import { DIARY_CHECK } from "@/constants/requests";
import Diary from "./Diary";

interface FetchingResult {
    data: any;
    isLoading: boolean;
    isError: boolean;
}

export default function Diaries() {
    const { data, isLoading, isError }: FetchingResult = useFetch("diaries", DIARY_CHECK);

    return (
        !isLoading &&
        !isError && (
            <>
                {data.map((diary) => {
                    return <Diary data={diary} />;
                })}
                ;
            </>
        )
    );
}
