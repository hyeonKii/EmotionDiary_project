import { useRequestGetAllDiaries } from "@/api/diary";
import AllDiariesPost from "../home/AllDiariesPost";

export default function DiaryGetAll() {
    const { data: response, refetch } = useRequestGetAllDiaries("diaries", "?count=10&page=1", {
        enabled: false,

        onSuccess: (data) => {
            console.log(data);
        },
        onError: () => {},
    });

    const buttonHandler = () => {
        refetch();
    };

    return (
        <>
            <button onClick={buttonHandler}>데이터 체크</button>
            {response && (
                <section>
                    {response.data.map((post) => (
                        <AllDiariesPost key={post.id + "포스트"} post={post} refetch={refetch} />
                    ))}
                </section>
            )}
        </>
    );
}
