const jwt = require("jsonwebtoken");
const createError = require("http-errors");
const { jwtSecretKey } = require("../secret");

const isLoggedIn = async (req, res, next) => {
  try {
    const accessToken = req.cookies?.accessToken;
    if (!accessToken) {
      return next(createError(401, "Access token is not found! Please login again."));
    }

    const decoded = jwt.verify(accessToken, jwtSecretKey);

    if (!decoded) {
      return next(createError(401, "Invalid access token. Please login again!"));
    }

    req.user = decoded.user;
    next();

  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return next(createError(401, "Access token expired. Please refresh your session."));
    }

    return next(createError(401, "Unauthorized access. Please login again."));
  }
};

const isLoggedOut = async (req, res, next) => {
  try {
    const accessToken = req.cookies?.accessToken;
    if (accessToken) {
      try {
        const decoded = jwt.verify(accessToken, jwtSecretKey);
        if (decoded) {
          throw createError(400, "user is already logged in!");
        }
      } catch (error) {
        throw error;
      }
    }

    next();
  } catch (error) {
    return next(error);
  }
};

module.exports = {isLoggedIn, isLoggedOut};
