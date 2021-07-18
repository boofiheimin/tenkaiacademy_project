import jwt from "jsonwebtoken";
import User from "../models/User.js";
import BlackListToken from "../models/BlackListToken.js";
import ErrorResponse from "../utils/ErrorResponse.js";

export const register = async (req, res, next) => {
  const { username, password, role } = req.body;
  try {
    const user = await User.create({
      username,
      password,
      role,
    });
    res.status(200).json({
      success: true,
      user,
    });
  } catch (err) {
    next(err);
  }
};

export const login = async (req, res, next) => {
  // Blacklist old token if new login
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (token) {
    const existingToken = await BlackListToken.findOne({ token });
    if (existingToken) {
      return next(new ErrorResponse("Unauthorized: Token BlackListed", 401));
    }
    const decoded = jwt.decode(token);

    try {
      await BlackListToken.create({
        token,
        expireAt: new Date(decoded.exp * 1000),
      });
    } catch (err) {
      next(err);
    }
  }

  //log in and give new token
  const { username, password } = req.body;

  if (!username || !password) {
    return next(new ErrorResponse("Please provide username and password", 400));
  }

  try {
    const user = await User.findOne({ username }).select("+password");
    if (!user) {
      return next(new ErrorResponse("Invalid credentials", 401));
    }
    const isMatch = await user.matchPasswords(password);
    if (!isMatch) {
      return next(new ErrorResponse("Invalid credentials", 401));
    }
    const newToken = user.getSignedToken();
    res.status(200).json({
      success: true,
      token: newToken,
      user: {
        _id: user._id,
        username: user.username,
        role: user.role,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const logout = async (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];

  const decoded = jwt.decode(token);

  try {
    const blacklist = await BlackListToken.create({
      token,
      expireAt: new Date(decoded.exp * 1000),
    });
    res.status(200).json({
      success: true,
      blacklist,
    });
  } catch (err) {
    next(err);
  }
};

export const authenticate = async (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  const decoded = jwt.decode(token);
  const user = await User.findById(decoded.id);
  if (!user) {
    return next(new ErrorResponse("No user found with this id", 401));
  }
  res.status(200).json({
    success: true,
    user,
    token,
  });
};
