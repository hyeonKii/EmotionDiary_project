type ErrorName =
    | "UnknownError"
    | "InvalidTokenError"
    | "TokenExpiredError"
    | "UserExistError"
    | "UserNotExistError"
    | "InvalidEmailFormatError"
    | "NotFindError"
    | "ArgumentError"
    | "WrongPasswordError"
    | "LoginError"
    | "LogOutError"
    | "WithdrawnError"
    | "InvalidAccessError"
    | "InternalServerError"
    | "BodyDataError"
    | "UpdateError"
    | "TokenExistError";

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
    UserNotExistError: {
        statusCode: 400,
        message: "User does not exists",
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
    LoginError: {
        statusCode: 400,
        message: "Login failed",
    },
    LogOutError: {
        statusCode: 400,
        message: "Logout failed",
    },
    WithdrawnError: {
        statusCode: 400,
        message: "withdrawn member",
    },
    InvalidAccessError: {
        statusCode: 400,
        message: "Login failed",
    },
    InternalServerError: {
        statusCode: 500,
        message: "Internal Server Error",
    },
    BodyDataError: {
        statusCode: 404,
        message: "BodyData is wrong",
    },
    UpdateError: {
        statusCode: 400,
        message: "Update fails because of wrong data",
    },
    TokenExistError: {
        statusCode: 400,
        message: "Token of user already exists",
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
