import jwt from "jsonwebtoken";
import { errorHandler } from "./error.js";
export const verifyToken = (req, res, next) => {
  // const token = req.headers.token;

  //previous validation done using cookies
  const token = req.headers.jwt_token;
  //console.log(token1);
  if (!token) {
    return next(errorHandler(401, "Unauthorized"));
  }
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return next(errorHandler(401, "Unauthorized"));
    }
    console.log(user);
    req.user = user;
    next();
  });
};
