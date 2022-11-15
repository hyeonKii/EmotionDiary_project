type ErrorName = "UnknownError" | "UserExistError" | "InvalidEmailFormatError";

interface ErrorInfo {
    statusCode: number;
    message: string;
}

const ERROR_MAP: Record<ErrorName, ErrorInfo> = {
    UnknownError: {
        statusCode: 404,
        message: "An unknown error has occurred",
    },
    UserExistError: {
        statusCode: 400,
        message: "User already exists",
    },
    InvalidEmailFormatError: {
        statusCode: 400,
        message: "Invalid email format",
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
