import React from "react";
import { useState } from "react";
import useRequest from "@/hooks/useRequest";

type ValidationFn = {
    (id: string, value: string): boolean;
};

export default function useForm(
    initialState: object,
    endpoint: string[],
    validationFn?: ValidationFn
) {
    const [form, setForm] = useState(initialState);
    const [validatedForm, setValidatedForm] = useState(initialState);
    const { requestHandler } = useRequest(endpoint, form);

    const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = event.target;

        setForm((prevState) => ({
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

    const submitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        await requestHandler();
        setForm(initialState);
    };

    return { form, validatedForm, changeHandler, submitHandler, requestHandler };
}
