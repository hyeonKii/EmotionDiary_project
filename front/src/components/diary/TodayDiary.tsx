import { useEffect, useState } from "react";
import Calendar from "react-calendar";
import { useRecoilValue } from "recoil";
import { currentUser } from "@/temp/userAtom";
import useEmotion from "@/hooks/useEmotion";
import useForm from "@/hooks/useForm";
import { useRequestWriteDiary, useRequestGetDiary } from "@/api/diary";
import {
    TodaySection,
    CalendarDetail,
    DiaryDetail,
    EditBlock,
    ReadBlock,
} from "@/styles/diary/todayDiary-style";

const test = {
    id: 1,
    emotion: "슬픔",
    title: "test1",
    description: "test",
    privateDiary: false,
    view: 0,
    createdAt: "2022-11-28T05:53:27.072Z",
    user_model_id: 1,
};

export function TodayDiary() {
    const user = useRecoilValue(currentUser);
    const [value, setValue] = useState(new Date());
    const [isEdit, setIsEdit] = useState(false);

    const { data, refetch } = useRequestGetDiary(["diary"], 32, {
        enabled: false,
        onSuccess: () => {
            return data;
        },
        onError: (error: Error) => {
            console.error(error.message);
        },
    });

    useEffect(() => {
        refetch();
    }, [useRequestGetDiary, value]);

    const { emotionState } = useEmotion(data?.data.emotion, user?.nickname);
    const { form, changeHandler } = useForm({
        title: data?.data.title,
        description: "test",
        privateDiary: true,
    });
    const { title, description, privateDiary } = form;

    const dateString = value.toLocaleDateString("ko-KR", {
        year: "numeric",
        month: "long",
        day: "numeric",
    });

    const { mutate: writeDiary } = useRequestWriteDiary(form, {
        onSuccess: () => {
            setIsEdit(false);
        },
        onError: ({ message }: Error) => {
            console.error(message);
        },
    });

    const onSubmit = () => {
        writeDiary();
    };

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
                            {test.privateDiary ? (
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
                            <button className="material-symbols-outlined">delete</button>
                        </div>
                        {test.privateDiary ? (
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
                                id="title"
                                className="title"
                                value={title}
                                onChange={changeHandler}
                            />
                            <textarea
                                id="description"
                                className="description"
                                value={description}
                                onChange={changeHandler}
                                rows={9}
                                autoFocus
                            />
                            <div>
                                <span
                                    className={description.length < 500 ? "countText" : "maxText"}
                                >
                                    {description.length}/500
                                </span>
                                <button
                                    type="submit"
                                    className="submitButton"
                                    onClick={onSubmit}
                                    disabled={
                                        description.length === 0 ||
                                        description.length > 500 ||
                                        title.length === 0
                                    }
                                >
                                    저장
                                </button>
                            </div>
                        </EditBlock>
                    ) : (
                        <ReadBlock>
                            {data && <p className="title">{data?.data.title}</p>}
                            {data && <p className="description">{data?.data.description}</p>}
                        </ReadBlock>
                    )}
                </DiaryDetail>
            </CalendarDetail>
        </TodaySection>
    );
}
