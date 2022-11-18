declare namespace Express {
    export interface Request {
        userID?: string;
        refreshToken?: string;
        test: number;
    }
}
