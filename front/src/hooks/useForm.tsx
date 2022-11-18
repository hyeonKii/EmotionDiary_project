import React from "react";
import { useState } from "react";
import useRequest from "@/hooks/useRequest";

interface Props {
    initialState: object;
    endpoint: string[];
    validationFn?(id: string, value: string): boolean;
}

export default function useForm({ initialState, endpoint, validationFn }: Props) {
    const [form, setForm] = useState(initialState);
    const [validatedForm, setValidatedForm] = useState(initialState);
    const { requestHandler } = useRequest(endpoint, form);

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

    const onSubmitHandler = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        requestHandler();
        setForm(initialState);
    };

    return { form, validatedForm, onChangeHandler, onSubmitHandler, requestHandler };
}
