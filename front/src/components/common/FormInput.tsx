import React from "react";
import { InputDataType } from "@/types/inputData_type";

type Props = {
    inputData: InputDataType;
    form: any;
    validatedForm?: any;
    changeHandler?(event: React.ChangeEvent<HTMLInputElement>): void;
};

export default function FormInput({ inputData, form, validatedForm, changeHandler }: Props) {
    return (
        <>
            {inputData.map((data, index) => {
                return (
                    <div key={data.name + index}>
                        <label htmlFor={data.name}>{data.description}</label>
                        <input
                            id={data.name}
                            type={data.type}
                            value={form[data.name]}
                            onChange={changeHandler}
                        />
                        {validatedForm[data.name] && <div>{`${data.name} 에러`}</div>}
                    </div>
                );
            })}
        </>
    );
}
