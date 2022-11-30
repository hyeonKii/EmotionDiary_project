import { useRequestDeleteDiary } from "@/api/diary";

interface Error {
    message: string;
}

export default function DiaryDelete() {
    const { mutate: deleteDiary } = useRequestDeleteDiary("1", {
        onSuccess: () => {
            console.log("일기 삭제 성공");
        },
        onError: (error: Error) => {
            console.log(error.message);
        },
    });

    const buttonHandler = () => {
        deleteDiary();
    };

    return (
        <>
            <button onClick={buttonHandler}>삭제</button>
        </>
    );
}
