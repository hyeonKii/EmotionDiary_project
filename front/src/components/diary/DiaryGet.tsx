import { useRequestGetDiary } from "@/api/diary";

export default function DiaryGet() {
    const { data, refetch } = useRequestGetDiary("diary", "2", {
        enabled: false,

        onSuccess: (res) => {
            console.log(res);
        },
        onError: () => {},
    });

    const buttonHandler = () => {
        refetch();
    };

    return (
        <>
            <button onClick={buttonHandler}>일기 하나</button>
        </>
    );
}
