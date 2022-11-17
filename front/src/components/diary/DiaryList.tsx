import useFetch from "@/hooks/useFetchData";
import { DIARY_CHECK } from "@/constants/requests";
import Diary from "./Diary";

export default function Diaries() {
    const { data, isLoading, isError }: { data: any; isLoading: boolean; isError: boolean } =
        useFetch("diaries", DIARY_CHECK);

    return (
        !isLoading &&
        !isError && (
            <>
                {data.map((diary: { title: string; type: string; content: string }) => {
                    return <Diary data={diary} />;
                })}
                ;
            </>
        )
    );
}
