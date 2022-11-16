import React from "react";
import { useState } from "react";

import { useMutation } from "react-query";

import api from "../api/api";

interface Props {
    initialState: object;
    endpoint: string[];
    validationFn?(id: string, value: string): boolean;
}

export default function useForm({ initialState, endpoint, validationFn }: Props) {
    const [form, setForm] = useState(initialState);
    const [validatedForm, setValidatedForm] = useState(initialState);

    const requestForm = useMutation((form: object) => api(endpoint, form), {
        onSuccess: () => {
            console.log("success");
        },
        onError: () => {
            console.log("error");
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
