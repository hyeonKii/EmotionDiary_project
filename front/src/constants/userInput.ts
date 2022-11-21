import { InputDataType } from "@/types/inputData_type";

const USER_LOGIN: InputDataType = [
    {
        type: "text",
        name: "userID",
        description: "아이디",
    },
    {
        type: "password",
        name: "password",
        description: "비밀번호",
    },
];

const USER_LOGIN_INITIAL = {
    userID: "",
    password: "",
};

const USER_REGISTER: InputDataType = [
    {
        type: "email",
        name: "email",
        description: "이메일",
    },
    {
        type: "text",
        name: "userID",
        description: "아이디",
    },
    {
        type: "text",
        name: "nickname",
        description: "별명",
    },
    {
        type: "password",
        name: "password",
        description: "비밀번호",
    },
];

const USER_REGISTER_INITIAL = {
    email: "",
    userID: "",
    nickname: "",
    password: "",
};

export { USER_LOGIN, USER_LOGIN_INITIAL, USER_REGISTER, USER_REGISTER_INITIAL };
