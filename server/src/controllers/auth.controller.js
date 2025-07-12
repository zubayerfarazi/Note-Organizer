const bcrypt = require("bcryptjs");
const createError = require("http-errors");
const jwt = require("jsonwebtoken");

const User = require("../models/user.model");
const generateJsonWebToken = require("../helper/jwt.helper");
const { jwtSecretKey, jwtRefreshKey } = require("../secret");
const { successResponse } = require("../helper/response.helper");

const handleLogin = async (req, res, next) => {
  const { name, email, password } = req.body;

  try {
    const user = await User.findOne({ email: email });
    if (!user) {
      throw createError(
        404,
        "User does not exist with this email. Please register first!"
      );
    }
    const matchPassword = await bcrypt.compare(password, user.password);
    if (!matchPassword)
      throw createError(404, "Password is not matched! Please try again!");

    const accessToken = generateJsonWebToken({ user }, jwtSecretKey, "1h");

    res.cookie("accessToken", accessToken, {
      maxAge: 10 * 60 * 1000,
      httpOnly: true,
      secure: true,
    });

    const refreshToken = generateJsonWebToken(
      { user },
      jwtRefreshKey,
      "7d"
    );

    res.cookie("refreshToken", refreshToken, {
      maxAge: 1 * 24 * 60 * 60 * 1000,
      httpOnly: true,
      secure: true,
    });

    return successResponse(res, {
      statusCode: 200,
      message: "Login Successful!",
      payload: { user, accessToken, refreshToken },
    });
  } catch (error) {
    next(error);
  }
};

const handleLogOut = (req, res, next) => {
  try {
    res.clearCookie("accessToken", { httpOnly: true, secure: true });
    res.clearCookie("refreshToken", { httpOnly: true, secure: true });

    return successResponse(res, {
      statusCode: 200,
      message: "Successfully LoggedOut",
    });
  } catch (error) {
    next(error);
  }
};

const handleRefreshToken = async (req, res, next) => {
  try {
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {
      throw createError(401, "Refresh token missing. Please login again.");
    }

    const decoded = jwt.verify(refreshToken, jwtRefreshKey);

    if (!decoded?.user?._id) {
      throw createError(403, "Invalid refresh token");
    }

    const user = await User.findById(decoded.user._id).select("-password");
    if (!user) {
      throw createError(404, "User not found");
    }

    const newAccessToken = generateJsonWebToken({ user: user }, jwtSecretKey, "1h");

    res.cookie("accessToken", newAccessToken, {
      httpOnly: true,
      secure: true,
      sameSite: "None",
      maxAge: 10 * 60 * 1000, 
    });

    return successResponse(res, {
      statusCode: 200,
      message: "New access token generated",
      payload: { accessToken: newAccessToken },
    });
  } catch (error) {
    return next(error);
  }
};

module.exports = {handleLogOut, handleLogin, handleRefreshToken}