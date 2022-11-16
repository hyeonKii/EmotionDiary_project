import React from "react";

interface FormProps {
    inputData: object[];
    form: object;
    validatedForm: object;
    onChangeHandler(event: React.ChangeEvent<HTMLInputElement>): void;
}

export default function FormInput({ inputData, form, validatedForm, onChangeHandler }: FormProps) {
    return inputData.map((data = { name: "", description: "", type: "" }, index: number) => {
        return (
            <div key={"inputData" + index}>
                <label htmlFor={data.name}>{data.description}</label>
                <input
                    id={data.name}
                    type={data.type}
                    value={form[data.name]}
                    onChange={onChangeHandler}
                />
                {validatedForm[data.name] && <div>{`${data.name} 에러`}</div>}
            </div>
        );
    });
}
