import { useRequestEditDiary } from "@/api/diary";
import useForm from "@/hooks/useForm";

function DiaryEdit({ diary, setEditMode, key }) {
    const { form, changeHandler } = useForm({
        title: [diary.title],
        description: [diary.description],
    });

    const { mutate: editDiary } = useRequestEditDiary(form, {
        onSuccess: () => {},
        onError: () => {},
    });

    const editDiary = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        editDiary();
    };

    return (
        <form key={key}>
            <label htmlFor="title">이메일</label>
            <input type="text" id="title" onChange={changeHandler} />
            <label htmlFor="description">아이디</label>
            <input type="textarea" id="description" onChange={changeHandler} />
            <button type="button" onClick={() => setEditMode(true)}>
                수정
            </button>
            <button type="button">삭제</button>
        </form>
    );
}

export default DiaryEdit;
