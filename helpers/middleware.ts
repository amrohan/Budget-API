import {
  NextFunction,
  Request as ExpressRequest,
  Response as ExpressResponse,
} from "express";

import jwt from "jsonwebtoken";

export const authMiddleware = async (
  req: ExpressRequest,
  res: ExpressResponse,
  next: NextFunction
) => {
  const token = req.cookies.token;

  if (!token) {
    res.status(401).send({ message: "You are not authorized" });
    return;
  }

  try {
    const decodedPayload = jwt.verify(token, process.env.JWT_SECRET);

    next();
  } catch (error) {
    res.status(403).send({ message: "Invalid token" });
  }
};
