import { useState, ChangeEvent } from "react";

interface ValidationFn {
    (id: string, value: string): void;
}

function useForm<T>(initialState: T, validationFn?: ValidationFn) {
    const [form, setForm] = useState(initialState);
    const [validatedForm, setValidatedForm] = useState(initialState);

    const changeHandler = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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

    const resetForm = () => {
        setForm(null);
    };

    return { form, setForm, validatedForm, changeHandler, resetForm };
}

export default useForm;
