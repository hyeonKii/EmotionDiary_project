import { useState, useEffect, useRef, FormEvent, ChangeEvent } from "react";
import { useRecoilValue } from "recoil";
import { currentUser } from "@/temp/userAtom";
import { useRequestWriteDiary } from "@/api/diary";
import useForm from "@/hooks/useForm";
import { HomeSection, TitleBlock, Input } from "@/styles/home/home-style";
import { Form, FormTitle, FormButton, PostBlock } from "@/styles/common/Modal/Form-style";

export default function Main() {
    const [isOpen, setIsOpen] = useState(false);
    const user = useRecoilValue(currentUser);
    const ref = useRef<HTMLFormElement>(null);

    const { form, setForm, changeHandler } = useForm({
        title: "",
        description: "",
        privateDiary: true,
    });

    const { title, description } = form;

    const { mutate: writeDiary } = useRequestWriteDiary(form, {
        onSuccess: () => {
            setIsOpen(false);
        },
        onError: ({ message }: Error) => {
            console.error(message);
        },
    });

    useEffect(() => {
        const onClickOutside = (e: MouseEvent) => {
            if (ref.current !== null && !ref.current.contains(e.target as Node)) {
                setForm((form) => ({ ...form, title: "", description: "", privateDiary: true }));
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", onClickOutside);
        return () => {
            document.removeEventListener("mousedown", onClickOutside);
        };
    }, [ref, setIsOpen]);

    const onSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        writeDiary();
        setForm((form) => ({ ...form, title: "", description: "", privateDiary: true }));
    };

    const onPrivateSelect = (e: ChangeEvent<HTMLSelectElement>) => {
        const value = e.target.value === "true" ? true : false;
        setForm((form) => ({ ...form, privateDiary: value }));
    };

    const onClose = () => {
        setForm((form) => ({ ...form, title: "", description: "", privateDiary: true }));
        setIsOpen(false);
    };

    return (
        <HomeSection>
            <TitleBlock>
                <h1>마음일기</h1>
                <p>하루 한 줄 마음 기록하기</p>
            </TitleBlock>
            <Input
                type="text"
                placeholder="오늘은 어떤 하루를 보내셨나요? 닉네임님의 오늘 마음을 기록해 보세요!"
                autoFocus
                onClick={() => setIsOpen(true)}
            />
            {isOpen && (
                <Form ref={ref} onSubmit={onSubmit}>
                    <button onClick={onClose} className="material-symbols-outlined">
                        close
                    </button>
                    <FormTitle>일기쓰기</FormTitle>
                    <PostBlock>
                        <select onChange={onPrivateSelect}>
                            <option value="true" selected>
                                나만보기
                            </option>
                            <option value="false">전체공개</option>
                        </select>
                        <input
                            id="title"
                            value={title}
                            onChange={changeHandler}
                            placeholder="제목"
                        />
                        <textarea
                            id="description"
                            value={description}
                            onChange={changeHandler}
                            rows={9}
                            placeholder={`${user?.nickname}의 오늘의 마음을 기록해 보세요!`}
                        />
                    </PostBlock>
                    <span className={description.length > 500 ? "countText maxText" : "countText"}>
                        최대 500자로 작성할 수 있습니다. {description.length}/500
                    </span>
                    <FormButton
                        type="submit"
                        disabled={
                            title.length === 0 ||
                            description.length === 0 ||
                            description.length > 500
                        }
                    >
                        저장
                    </FormButton>
                </Form>
            )}
        </HomeSection>
    );
}
