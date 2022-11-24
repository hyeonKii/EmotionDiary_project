import path from "path";
type ErrorName =
    | "UnknownError"
    | "InvalidTokenError"
    | "TokenExpiredError"
    | "UserExistError"
    | "InvalidEmailFormatError"
    | "NotFindError"
    | "ArgumentError"
    | "WrongPasswordError"
    | "LoginFailError"
    | "InvalidAccessError"
    | "InternalServerError";

interface ErrorInfo {
    statusCode: number;
    message: string;
}

const ERROR_MAP: Record<ErrorName, ErrorInfo> = {
    UnknownError: {
        statusCode: 404,
        message: "An unknown error has occurred",
    },
    InvalidTokenError: {
        statusCode: 401,
        message: "Token is invalid",
    },
    TokenExpiredError: {
        statusCode: 401,
        message: "Token is expired",
    },
    UserExistError: {
        statusCode: 400,
        message: "User already exists",
    },
    InvalidEmailFormatError: {
        statusCode: 400,
        message: "Invalid email format",
    },
    NotFindError: {
        statusCode: 400,
        message: "can not find",
    },
    ArgumentError: {
        statusCode: 400,
        message: "Wrong argument",
    },
    WrongPasswordError: {
        statusCode: 400,
        message: "Login Failed",
    },
    LoginFailError: {
        statusCode: 400,
        message: "Login failed",
    },
    InvalidAccessError: {
        statusCode: 400,
        message: "Login failed",
    },
    InternalServerError: {
        statusCode: 500,
        message: "Internal Server Error",
    },
};

class AppError extends Error {
    public readonly statusCode: number;

    constructor(errorName: ErrorName) {
        // super(ERROR_MAP[errorName].message);
        super(ERROR_MAP[errorName].message);

        this.statusCode = ERROR_MAP[errorName].statusCode;
    }
}

export default AppError;
