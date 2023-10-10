import { NextFunction, Request as ExpressRequest, Response as ExpressResponse } from 'express';


export const authMiddleware = async (req: ExpressRequest, res: ExpressResponse, next: NextFunction) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        res.status(401).send({ message: "Please send a valid token" });
        return;
    }

    const token = authHeader.split(" ")[1];

    const validToken = process.env.TOKEN; // Get the valid token from the local environment

    if (token !== validToken) {
        res.status(403).send({ message: "Invalid token" });
        return;
    }
    next();
};
