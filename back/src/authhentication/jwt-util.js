import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const TokenSetting = {
    accessToken: "1h",
    refreshToken: "14d",
};

const secret = process.env.JWT_SECRET ?? "";

export const generateToken = (payload, tokenType) => {
    return jwt.sign(payload, secret, {
        algorithm: "HS256",
        expiresIn: TokenSetting[tokenType],
    });
};

export const verifyToken = (token) => {
    try {
        const decoded = jwt.verify(token, secret);
        return {
            ok: true,
            decoded,
        };
    } catch (err) {
        if (err.name === "TokenExpiredError") {
            return null;
        }

        throw new Error(err);
    }
};
