import type { ErrorRequestHandler } from "express";

const error: ErrorRequestHandler = (err, req, res, next) => {
    const { statusCode, message } = err;

    res.status(statusCode ?? 400).send(message);
};

export default error;
