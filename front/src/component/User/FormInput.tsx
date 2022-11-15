export default function FormInput({ inputData, form, validatedForm, onChangeHandler }) {
    return inputData.map(
        (data: { type: string; name: string; description: string }, index: number) => {
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
        }
    );
}
