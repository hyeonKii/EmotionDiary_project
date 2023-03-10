import { useState, useEffect, useRef, FormEvent, ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";

import { currentUser } from "@/temp/userAtom";
import { useRequestWriteDiary, useRequestGetMonthDiaries } from "@/api/diary";
import useForm from "@/hooks/useForm";
import { PostInterface } from "@/components/diary/interface/post";

import { happy } from "@/assets/images/index";
import { HomeSection, TitleBlock, Input } from "@/styles/home/home-style";
import { SelectStyle } from "@/styles/diary/diary-style";
import { Form, FormTitle, FormButton, PostBlock } from "@/styles/common/modal/Form-style";
import { ModalBackgroundStyle } from "@/styles/common/modal/background-style";

export default function Main() {
    const [isOpen, setIsOpen] = useState(false);
    const [todayPost, setTodayPost] = useState(false);
    const navigate = useNavigate();
    const user = useRecoilValue(currentUser);
    const ref = useRef<HTMLFormElement | null>(null);
    const today = new Date();

    const { form, setForm, changeHandler } = useForm({
        title: "",
        description: "",
        privateDiary: true,
    });
    const { title, description } = form;

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

    const {
        isSuccess,
        data: monthDiaries,
        refetch,
    } = useRequestGetMonthDiaries(today.getFullYear(), today.getMonth() + 1, "home-diaries", {
        enabled: !!user,

        onSuccess: () => {
            return;
        },

        onError: ({ message }: Error) => {
            console.error(message);
        },
    });

    useEffect(() => {
        const day = monthDiaries?.data?.map((posts: PostInterface) =>
            new Date(posts.createdAt).getDate()
        );

        const post = day?.find((posts: number) => posts === today.getDate());

        post !== undefined ? setTodayPost(true) : setTodayPost(false);
    }, [isSuccess]);

    const { mutate: writeDiary } = useRequestWriteDiary(form, {
        onSuccess: () => {
            setIsOpen(false);
            setTodayPost(true);
            setForm((form) => ({ ...form, title: "", description: "", privateDiary: true }));
            refetch();
        },
        onError: ({ message }: Error) => {
            console.error(message);
        },
    });

    const onSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        writeDiary();
    };

    const onPrivateSelect = (e: ChangeEvent<HTMLSelectElement>) => {
        const value = e.target.value === "true" ? true : false;
        setForm((form) => ({ ...form, privateDiary: value }));
    };

    const onClose = () => {
        setIsOpen(false);
        setForm((form) => ({ ...form, title: "", description: "", privateDiary: true }));
    };

    return (
        <HomeSection>
            <TitleBlock>
                <h1>????????????</h1>
                <p>?????? ??? ??? ?????? ????????????</p>
            </TitleBlock>
            <Input
                type="text"
                placeholder={`????????? ?????? ????????? ???????????????? ${user?.nickname}?????? ?????? ????????? ????????? ?????????!`}
                autoFocus
                onClick={() => setIsOpen(true)}
            />
            {isOpen &&
                (todayPost ? (
                    <>
                        <Form ref={ref}>
                            <button onClick={onClose} className="material-symbols-outlined">
                                close
                            </button>
                            <img src={happy} alt="happy" />
                            <p className="todayText">
                                {user?.nickname}???!
                                <br /> ????????? ?????? ????????? ??????????????????!
                                <br /> ????????? ????????? ?????? ??????????????? <br />
                                ????????? ??????, ??????, ????????? ??????????????? :)
                            </p>
                            <FormButton onClick={() => navigate("/diary")}>
                                ??? ?????? ?????? ??????
                            </FormButton>
                        </Form>
                        <ModalBackgroundStyle />
                    </>
                ) : (
                    <>
                        <Form ref={ref} onSubmit={onSubmit}>
                            <button onClick={onClose} className="material-symbols-outlined">
                                close
                            </button>
                            <FormTitle>????????????</FormTitle>
                            <PostBlock>
                                <SelectStyle onChange={onPrivateSelect} defaultValue="true">
                                    <option value="true">&#128274; ????????????</option>
                                    <option value="false">&#128275; ????????????</option>
                                </SelectStyle>
                                <input
                                    id="title"
                                    value={title}
                                    onChange={changeHandler}
                                    placeholder="??????"
                                />
                                <textarea
                                    id="description"
                                    value={description}
                                    onChange={changeHandler}
                                    rows={9}
                                    placeholder={`${user?.nickname}??? ????????? ????????? ????????? ?????????!`}
                                />
                            </PostBlock>
                            <span
                                className={
                                    description.length > 500 ? "countText maxText" : "countText"
                                }
                            >
                                ?????? 500?????? ????????? ??? ????????????. {description.length}/500
                            </span>
                            <FormButton
                                type="submit"
                                disabled={
                                    title.length === 0 ||
                                    description.length === 0 ||
                                    description.length > 500
                                }
                            >
                                ??????
                            </FormButton>
                        </Form>
                        <ModalBackgroundStyle />
                    </>
                ))}
        </HomeSection>
    );
}
