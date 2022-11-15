import React from "react";
import { useState } from "react";

interface Props {
    initialState: object;
    validationFn(id: string, value: string): boolean;
}

export default function useForm({ initialState, validationFn }: Props) {
    const [form, setForm] = useState(initialState);
    const [validatedForm, setValidatedForm] = useState(initialState);

    const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = event.target;

        setForm((prevState: object) => ({
            ...prevState,
            [id]: value,
        }));

        setValidatedForm((prevState: object) => ({
            ...prevState,
            [id]: validationFn(id, value),
        }));
    };

    return { form, validatedForm, onChangeHandler };
}
