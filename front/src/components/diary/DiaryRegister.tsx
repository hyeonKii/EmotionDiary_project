import { useRequestWriteDiary } from "@/api/diary";
import useForm from "@/hooks/useForm";
import React from "react";

interface Error {
    message: string;
}

export default function DiaryRegister() {
    const { form, changeHandler } = useForm({ title: "", description: "", privateDiary: true });

    const { mutate: writeDiary } = useRequestWriteDiary(form, {
        onSuccess: () => {},
        onError: (error: Error) => {
            console.log(error.message);
        },
    });

    const submitHandler = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        writeDiary();
    };

    return (
        <>
            <form onSubmit={submitHandler}>
                <fieldset>
                    <input type="text" id="title" value={form.title} onChange={changeHandler} />
                    <input
                        type="textarea"
                        id="description"
                        value={form.description}
                        onChange={changeHandler}
                    />
                </fieldset>
                <button>전송</button>
            </form>
        </>
    );
}
