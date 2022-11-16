import React from "react";
import { useState } from "react";
import { useMutation } from "react-query";
import API from "../api/api";

interface Props {
    initialState: object;
    endpoint: string[];
    validationFn?(id: string, value: string): boolean;
}

export default function useForm({ initialState, endpoint, validationFn }: Props) {
    const [form, setForm] = useState(initialState);
    const [validatedForm, setValidatedForm] = useState(initialState);

    const requestForm = useMutation((form: object) => API(endpoint, form), {
        onSuccess: () => {
            console.log(`${endpoint[0]} 요청 성공`);
        },
        onError: () => {
            console.log(`${endpoint[0]} 요청 실패`);
        },
    });

    const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = event.target;

        setForm((prevState: object) => ({
            ...prevState,
            [id]: value,
        }));

        if (validationFn) {
            setValidatedForm((prevState: object) => ({
                ...prevState,
                [id]: validationFn(id, value),
            }));
        }
    };

    const onSubmitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        requestForm.mutate(form);
    };

    return { form, validatedForm, onChangeHandler, onSubmitHandler };
}
