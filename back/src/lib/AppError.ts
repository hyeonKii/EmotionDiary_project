type ErrorName =
    | "UnknownError"
    | "InvalidTokenError"
    | "TokenExpiredError"
    | "UserExistError"
    | "InvalidEmailFormatError"
    | "UserNotFindError"
    | "ArgumentError"
    | "WrongPasswordError"
    | "LoginFailError";

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
    UserNotFindError: {
        statusCode: 400,
        message: "User can not find",
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
};

class AppError extends Error {
    public readonly statusCode: number;

    constructor(errorName: ErrorName) {
        super(ERROR_MAP[errorName].message);

        this.statusCode = ERROR_MAP[errorName].statusCode;
    }
}

export default AppError;
