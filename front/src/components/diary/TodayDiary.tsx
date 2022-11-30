import { useState, ChangeEvent } from "react";
import Calendar from "react-calendar";
import { useRecoilValue } from "recoil";
import { currentUser } from "@/temp/userAtom";
import useEmotion from "@/hooks/useEmotion";
import {
    TodaySection,
    CalendarDetail,
    DiaryDetail,
    EditBlock,
    ReadBlock,
} from "@/styles/diary/todayDiary-style";

const data = {
    id: 1,
    emotion: "슬픔",
    title: "test1",
    description: "test",
    private: false,
    view: 0,
    createdAt: "2022-11-28T05:53:27.072Z",
    user_model_id: 1,
};

export function TodayDiary() {
    const user = useRecoilValue(currentUser);
    const [value, setValue] = useState(new Date());
    const [newText, setNewText] = useState({
        title: data.title,
        description: data.description,
        private: data.private,
    });
    const [isEdit, setIsEdit] = useState(false);
    const { emotionState } = useEmotion(data.emotion, user?.nickname);

    const dateString = value.toLocaleDateString("ko-KR", {
        year: "numeric",
        month: "long",
        day: "numeric",
    });
    console.log(data.createdAt);

    const onChange = (e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        const { name, value } = e.currentTarget;
        setNewText((prev) => ({
            ...prev,
            [name]: value,
        }));

        if (newText.description.length > 500) alert("500자");
    };

    const onDelete = async () => {
        try {
            // await api.deleteMyDiary(`${id}`);
            setNewText({ title: "", description: "", private: true });
            setIsEdit(true);
        } catch (e) {
            console.error(e);
        }
    };

    // const onEdit = async () => {
    //   try {
    //     await api.editMyDiary(`${id}`, {newText})
    //   } catch(e) {
    //     console.error(e)
    //   }
    // }

    return (
        <TodaySection>
            <Calendar
                locale="en-EN"
                next2Label={null}
                prev2Label={null}
                onChange={setValue}
                value={value}
            />
            <CalendarDetail>
                {emotionState()}
                <DiaryDetail isEdit={isEdit}>
                    <article className="top">
                        <span className="date">{dateString}</span>
                        <div className="icons">
                            {data.private ? (
                                <span className="material-symbols-outlined">lock</span>
                            ) : (
                                <span className="material-symbols-outlined">lock_open</span>
                            )}
                            <button
                                className="material-symbols-outlined"
                                onClick={() => setIsEdit(true)}
                            >
                                edit
                            </button>
                            <button className="material-symbols-outlined" onClick={onDelete}>
                                delete
                            </button>
                        </div>
                        {data.private ? (
                            <select>
                                <option value="나만보기">나만보기</option>
                                <option value="전체공개">전체공개</option>
                            </select>
                        ) : (
                            <select>
                                <option value="전체공개">전체공개</option>
                                <option value="나만보기">나만보기</option>
                            </select>
                        )}
                    </article>
                    {isEdit ? (
                        <EditBlock>
                            <input
                                className="title"
                                name="title"
                                value={newText.title}
                                onChange={onChange}
                            />
                            <textarea
                                className="description"
                                rows="10"
                                name="description"
                                value={newText.description}
                                autoFocus
                                onChange={onChange}
                            />
                            <div>
                                <span className="countText">{newText.description.length}/500</span>
                                <button
                                    type="submit"
                                    className="submitButton"
                                    onClick={() => setIsEdit(false)}
                                    disabled={
                                        newText.description.length === 0 ||
                                        newText.title.length === 0
                                    }
                                >
                                    저장
                                </button>
                            </div>
                        </EditBlock>
                    ) : (
                        <ReadBlock>
                            <p className="title">{newText.title}</p>
                            <p className="description">{newText.description}</p>
                        </ReadBlock>
                    )}
                </DiaryDetail>
            </CalendarDetail>
        </TodaySection>
    );
}
