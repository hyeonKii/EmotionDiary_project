const USER_REGISTER = ["post", "user/new"];
const USER_LOGIN = ["post", "users"];
const USER_LOGOUT = ["delete", "users"];

const DIARY_CHECK = ["get", "diary"];
const DIARY_REGISTER = ["post", "diary/adddiary"];
const DIARY_EDIT = ["put", "diary"];
const DIARY_DELETE = ["delete", "diary"];

export {
    USER_REGISTER,
    USER_LOGIN,
    USER_LOGOUT,
    DIARY_CHECK,
    DIARY_REGISTER,
    DIARY_EDIT,
    DIARY_DELETE,
};
