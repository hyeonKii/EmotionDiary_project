import { useRequestGetDiary } from "@/api/diary";

interface Error {
    message: string;
}

export default function DiaryGet() {
    const { data, refetch } = useRequestGetDiary("diary", "2", {
        enabled: false,

        onSuccess: () => {
            console.log("일기 하나 GET 요청 성공");
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
            <button onClick={buttonHandler}>일기 하나</button>
        </>
    );
}
