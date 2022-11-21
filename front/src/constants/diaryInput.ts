import { InputDataType } from "@/types/inputData_type";

const DIARY_REGISTER: InputDataType = [
    {
        type: "text",
        name: "title",
        description: "제목",
    },
    {
        type: "textarea",
        name: "description",
        description: "일기 쓰기",
    },
];

const DIARY_REGISTER_INITIAL = {
    title: "",
    description: "",
};

export { DIARY_REGISTER, DIARY_REGISTER_INITIAL };
