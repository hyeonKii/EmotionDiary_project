import { sign, verify } from "jsonwebtoken";
import { config } from "dotenv";
import AppError from "./AppError";

config();

type TokenName = "access" | "refresh";

const expirationTime: Record<TokenName, string> = {
    access: "30m",
    refresh: "3h",
} as const;

const secretKey = process.env.SECRET ?? "SECRET";

export const generateToken = (tokenName: TokenName, data: string) => {
    const token = sign(
        {
            data,
        },
        secretKey,
        {
            expiresIn: expirationTime[tokenName],
        }
    );

    return token;
};

export const verifyToken = (token: string) => {
    try {
        const payload = verify(token, secretKey);

        return payload;
    } catch (e: any) {
        if (e.message === "jwt malformed") {
            return "InvalidTokenError";
        }

        if (e.message === "jwt expired") {
            return null;
        }

        throw new AppError("UnknownError");
    }
};
