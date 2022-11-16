type ErrorName = "UnknownError" | "InvalidTokenError" | "TokenExpiredError";

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
};

class AppError extends Error {
    public readonly statusCode: number;

    constructor(errorName: ErrorName) {
        super(ERROR_MAP[errorName].message);

        this.statusCode = ERROR_MAP[errorName].statusCode;
    }
}

export default AppError;
