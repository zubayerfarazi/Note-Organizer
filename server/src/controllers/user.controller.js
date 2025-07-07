const createError = require("http-errors");
const jwt = require("jsonwebtoken");

const User = require("../models/user.model");
const generateJsonWebToken = require("../helper/jwt.helper");
const { jwtSecretKey, clientUrl, jwtForgotSecretKey } = require("../secret");
const sendEmailWithNodemailer = require("../helper/email");
const { successResponse } = require("../helper/response.helper");

const getAllUsers = async (req, res, next) => {
  try {
    const search = req.query.search || "";
    const page = req.query.page ? Math.max(1, Number(req.query.page)) : 1;
    const limit = req.query.limit ? Math.max(1, Number(req.query.limit)) : 5;

    const escapeRegex = (text) => {
      return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
    };

    const searchRegression = new RegExp(".*" + escapeRegex(search) + ".*", "i");

    const filter = {
      $or: [
        { name: { $regex: searchRegression } },
        { email: { $regex: searchRegression } },
      ],
    };

    const users = await User.find(filter)
      .select("-password")
      .skip((page - 1) * limit)
      .limit(limit);

    if (users.length === 0)
      throw createError(403, "Forbidden! User not found.");

    const count = await User.find(filter).countDocuments();

    return successResponse(res, {
      statusCode: 200,
      message: "All users returned successfully!",
      payload: {
        users: users,
        totalPage: Math.ceil(count / limit),
        currentPage: page,
        previousPage: page - 1 > 0 ? page - 1 : null,
        nextPage: page + 1 <= Math.ceil(count / limit) ? page + 1 : null,
      },
    });
  } catch (error) {
    next(error);
  }
};

const getUserByID = async (req, res, next) => {
  try {
    const id = req.params.id;
    const user = await User.findById(id);

    return successResponse(res, {
      statusCode: 200,
      message: `User with ${id} has been returned!`,
      payload: { user },
    });
  } catch (error) {
    next(error);
  }
};

const processRegister = async (req, res, next) => {
  const { name, email, password } = req.body;

  try {
    const userExist = await User.exists({ email: email });
    if (userExist)
      throw createError(409, "User is exists with this email. Please Login!");

    const newUser = { name, email, password };

    const token = generateJsonWebToken(newUser, jwtSecretKey, "10m");

    const prepareEmail = {
      email: email,
      subject: "Activate Your Account",
      html: `
            <h2>Hello, ${name}</h2>
            <h3>Welcome to the Note Organizer!</h3>
            <p>We're excited to have you on board. Please click the link below to activate your account:</p>
            <p>
            <a href="${clientUrl}/verify-user/${encodeURIComponent(
        token
      )}" target="_blank" style="color: #007bff; text-decoration: none;">
            Activate My Account
            </a>
            </p>
            <p>If you didn't create this account, you can ignore this email.</p>
            <p>Best regards,<br>The Note Organizer Team</p>
            `,
    };

    try {
      await sendEmailWithNodemailer(prepareEmail);
    } catch (error) {
      throw createError(500, "Failed to send Email. Please try again later!");
    }

    return successResponse(res, {
      statusCode: 201,
      message: `An Email has been send ${email} to activate the account!`,
      payload: { token },
    });
  } catch (error) {
    next(error);
  }
};

const verifyRegister = async (req, res, next) => {
  try {
    const { token } = req.params;
    if (!token) throw createError(404, "Token not found!");

    const decode = jwt.verify(token, jwtSecretKey);
    if (!decode) throw createError(401, "Unable to verify user!");

    const { name, email, password } = decode;
    const userExist = await User.exists({ email });
    if (userExist) throw createError(409, "User already exists");

    const user = await User.create({ name, email, password });
    if (!user) throw createError(401, "Something went wrong");

    return successResponse(res, {
      statusCode: 201,
      message: "user is created successfully!",
      payload: { user },
    });
  } catch (error) {
    next(error);
  }
};

const processForgetPassword = async (req, res, next) => {
  try {
    const email = req.body.email;

    const userExists = await User.findOne({ email: email });
    if (!userExists) throw createError(404, "User not found with this email!");

    const token = generateJsonWebToken({ email }, jwtForgotSecretKey, "10m");

    const emailData = {
      email,
      subject: "Reset Password Email",
      html: `
                <h2>Hello, ${userExists.name}</h2>
                <h3>Welcome Back to the Pharmacy Website!</h3>
                <p>We received a request to reset your password for your account. If you made this request, click the link below to reset your password:</p>
                <p>
                <a href="${clientUrl}/reset-password/${encodeURIComponent(
        token
      )}" target="_blank" style="color: #007bff; text-decoration: none;">
                Reset My Password
                </a>
                </p>
                <p>If you didn't request a password reset, you can ignore this email. Your password will remain unchanged.</p>
                <p>Best regards,<br>The Pharmacy Website Team</p>
                `,
    };

    try {
      await sendEmailWithNodemailer(emailData);
    } catch (error) {
      throw createError(500, "Something went wrong. Please try again!");
    }

    return successResponse(res, {
      statusCode: 200,
      message: `An email has been send to reset your password in your email: ${email}`,
      payload: { token },
    });
  } catch (error) {
    next(error);
  }
};

const verifyNewPassword = async (req, res, next) => {
  try {
    const { newPassword, confirmPassword } = req.body;
    const token = req.params.token;

    const decode = jwt.verify(token, jwtForgotSecretKey);
    if (!decode) throw createError(404, "Something has been broken!");

    const updateUserPassword = await User.findOneAndUpdate(
      { email: decode.email },
      { $set: { password: newPassword } },
      { new: true, runValidators: true }
    );

    if (!updateUserPassword)
      throw createError(404, "Password can not be updated!");

    return successResponse(res, {
      statusCode: 200,
      message: "Password has been updated successfully!",
      payload: { updateUserPassword },
    });
  } catch (error) {
    next(error);
  }
};

const updateUserByID = async (req, res, next) => {
  try {
    const id = req.params.id;
    const updatedData = req.body;

    const user = await User.findById(id);
    if (!user) throw createError(404, "Something is wrong! Please try again.");

    const updatedUser = await User.findByIdAndUpdate(
      id,
      { $set: updatedData },
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      throw createError(404, `Can not be updated with this ID ${id}`);
    }

    return successResponse(res, {
      statusCode: 200,
      message: `User is updated successfully!`,
      payload: { updatedUser },
    });
  } catch (error) {
    next(error);
  }
};

const deleteUserByID = async (req, res, next) => {
  try {
    const id = req.params.id;

    const user = await User.findById(id);
    if (!user) throw createError(404, "Something is wrong! Please try again.");

    const deletedUser = await User.findByIdAndDelete(id);
    if (!deletedUser) throw createError(404, "Something is broken!");

    return successResponse(res, {
      statusCode: 200,
      message: `User with ID ${id} has been deleted successfully!`,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllUsers,
  getUserByID,
  processRegister,
  verifyRegister,
  processForgetPassword,
  verifyNewPassword,
  updateUserByID,
  deleteUserByID,
};
