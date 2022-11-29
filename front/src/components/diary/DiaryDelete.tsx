import { useRequestDeleteDiary } from "@/api/diary";

export default function DiaryDelete() {
    const { mutate: deleteDiary } = useRequestDeleteDiary("1", {
        onSuccess: (res) => {
            console.log(res);
        },
        onError: () => {},
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
