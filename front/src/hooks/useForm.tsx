import React from "react";
import { useState } from "react";

interface ValidationFn {
    (id: string, value: string): void;
}

function useForm<T>(initialState: T, validationFn?: ValidationFn) {
    const [form, setForm] = useState(initialState);
    const [validatedForm, setValidatedForm] = useState(initialState);

    const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = event.target;

        setForm((prevState) => ({
            ...prevState,
            [id]: value,
        }));

        if (validationFn) {
            setValidatedForm((prevState) => ({
                ...prevState,
                [id]: validationFn(id, value),
            }));
        }
    };

    return { form, validatedForm, changeHandler };
}

export default useForm;
