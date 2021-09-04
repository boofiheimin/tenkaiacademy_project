import jwt from "jsonwebtoken";
import User from "../models/user.js";
import BlackListToken from "../models/blackListToken.js";
import ErrorResponse from "../utils/errorResponse.js";

export const authorize = (roles = []) => {
  if (typeof roles === "string") {
    roles = [roles];
  }

  return [
    async (req, res, next) => {
      let token;

      if (
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")
      ) {
        token = req.headers.authorization.split(" ")[1];
      }

      if (!token) {
        return next(new ErrorResponse("Unauthorized: Invalid Token", 401));
      }

      const blackListToken = await BlackListToken.findOne({ token });

      if (blackListToken) {
        return next(new ErrorResponse("Unauthorized: Token BlackListed", 401));
      }

      try {
        const { role, id } = jwt.verify(token, process.env.JWT_SECRET);

        if (roles.length && !roles.includes(role)) {
          return next(
            new ErrorResponse("Not authorized to access this route", 401)
          );
        }

        const user = await User.findById(id);

        if (!user) {
          return next(new ErrorResponse("No user found with this id", 404));
        }

        req.user = user;

        next();
      } catch (err) {
        if (err.name === "TokenExpiredError") {
          return next(new ErrorResponse("Unauthorized: Token Expires", 401));
        }
        return next(
          new ErrorResponse("Not authorized to access this route", 401)
        );
      }
    },
  ];
};
