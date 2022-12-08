import { useState, useEffect, useRef, FormEvent, ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";

import { currentUser } from "@/temp/userAtom";
import { useRequestWriteDiary, useRequestGetMonthDiaries } from "@/api/diary";
import useForm from "@/hooks/useForm";

import { happy } from "@/assets/images/index";
import { HomeSection, TitleBlock, Input } from "@/styles/home/home-style";
import { Form, FormTitle, FormButton, PostBlock } from "@/styles/common/Modal/Form-style";

interface GetPost {
    id: number;
    emotion: string;
    createdAt: Date;
}

export default function Main() {
    const [isOpen, setIsOpen] = useState(false);
    const [todayPost, setTodayPost] = useState(false);
    const navigate = useNavigate();
    const user = useRecoilValue(currentUser);
    const ref = useRef<HTMLFormElement>(null);
    const today = new Date();

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

    const { data: monthDiaries } = useRequestGetMonthDiaries(
        today.getFullYear(),
        today.getMonth() + 1,
        {
            onSuccess: () => {
                console.log("성공");
            },

            onError: () => {
                console.log("월별 일기 요청 실패");
            },
        }
    );

    useEffect(() => {
        const day = monthDiaries?.data?.map((posts: GetPost) =>
            new Date(posts.createdAt).getDate()
        );
        const post = day?.filter((posts: number) => posts === today.getDate());

        post?.length !== 0 ? setTodayPost(true) : setTodayPost(false);
    }, [todayPost]);

    return (
        <HomeSection>
            <TitleBlock>
                <h1>마음일기</h1>
                <p>하루 한 줄 마음 기록하기</p>
            </TitleBlock>
            <Input
                type="text"
                placeholder={`오늘은 어떤 하루를 보내셨나요? ${user?.nickname}님의 오늘 마음을 기록해 보세요!`}
                autoFocus
                onClick={() => setIsOpen(true)}
            />
            {isOpen &&
                (todayPost ? (
                    <Form ref={ref}>
                        <button onClick={onClose} className="material-symbols-outlined">
                            close
                        </button>
                        <img src={happy} alt="happy" />
                        <p className="todayText">
                            {user?.nickname}님!
                            <br /> 오늘은 이미 일기를 작성하셨네요!
                            <br /> 아래의 버튼을 눌러 이동하시면 <br />
                            일기의 조회, 수정, 삭제가 가능합니다 :)
                        </p>
                        <FormButton onClick={() => navigate("/diary")}>
                            내 일기 보러 가기
                        </FormButton>
                    </Form>
                ) : (
                    <Form ref={ref} onSubmit={onSubmit}>
                        <button onClick={onClose} className="material-symbols-outlined">
                            close
                        </button>
                        <FormTitle>일기쓰기</FormTitle>
                        <PostBlock>
                            <select onChange={onPrivateSelect} defaultValue="true">
                                <option value="true">나만보기</option>
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
                        <span
                            className={description.length > 500 ? "countText maxText" : "countText"}
                        >
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
                ))}
        </HomeSection>
    );
}
