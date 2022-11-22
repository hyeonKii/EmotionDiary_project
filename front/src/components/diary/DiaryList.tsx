import Loading from "../UI/Loading";
import DiaryInfo from "./DiaryInfo";
import { useFetchDiary } from "@/api/diary";
import { QueryClient } from "react-query";

function DiaryList() {
    const queryClient = new QueryClient();
    const user = queryClient.getQueryData(["user"]);

    const { data: diaries, isLoading, error, isError } = useFetchDiary();

    if (isError) {
        return <div>{error.message}</div>;
    }

    return isLoading ? (
        <Loading />
    ) : (
        diaries.map((diary) => {
            <DiaryInfo key={diary.id} diary={diary} />;
        })
    );
}

export default DiaryList;
