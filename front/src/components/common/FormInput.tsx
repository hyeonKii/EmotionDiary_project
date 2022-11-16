import React from "react";

type FormProps = {
    inputData: { name: string; type: string; description: string }[];
    form: any;
    validatedForm: any;
    onChangeHandler(event: React.ChangeEvent<HTMLInputElement>): void;
};

export default function FormInput({ inputData, form, validatedForm, onChangeHandler }: FormProps) {
    return (
        <>
            {inputData.map((data, index) => {
                <div key={"inputData" + index}>
                    <label htmlFor={data.name}>{data.description}</label>
                    <input
                        id={data.name}
                        type={data.type}
                        value={form[data.name]}
                        onChange={onChangeHandler}
                    />
                    {validatedForm[data.name] && <div>{`${data.name} 에러`}</div>}
                </div>;
            })}
        </>
    );
}
