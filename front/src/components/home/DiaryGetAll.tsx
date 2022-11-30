import { useRequestGetAllDiaries } from "@/api/diary";
import AllDiariesPost from "../diary/AllDiariesPost";

interface Error {
    message: string;
}

interface Post {
    id: number;
    title: string;
    description: string;
    emotion: string;
    time: string;
    body: string;
    privateDiary: boolean;
}

export default function DiaryGetAll() {
    const { data: response, refetch } = useRequestGetAllDiaries("diaries", "?count=10&page=1", {
        enabled: false,

        onSuccess: () => {
            console.log("일기 전부 GET 요청 성공");
        },
        onError: (error: Error) => {
            console.log(error.message);
        },
    });

    const buttonHandler = () => {
        refetch();
    };

    return (
        <>
            <button onClick={buttonHandler}>데이터 체크</button>
            {response && (
                <section>
                    {response.data.map((post: Post) => (
                        <AllDiariesPost key={post.id + "포스트"} post={post} refetch={refetch} />
                    ))}
                </section>
            )}
        </>
    );
}
