
const express = require('express');
const { getAllUsers, updateUserByID, deleteUserByID, processRegister, verifyRegister, processForgetPassword, verifyNewPassword, getUserByID } = require('../controllers/user.controller');
const { isLoggedIn, isLoggedOut } = require('../middlewares/auth.middleware');

const userRoute = express.Router();

userRoute.get("/users", isLoggedIn, getAllUsers);
userRoute.get("/users/:id", isLoggedIn, getUserByID);
userRoute.put("/users/:id", isLoggedIn, updateUserByID);
userRoute.delete("/users/:id", isLoggedIn, deleteUserByID);
userRoute.post("/process-register", processRegister);
userRoute.get("/verify-register/:token", verifyRegister);
userRoute.post("/process-forget-password", processForgetPassword);
userRoute.post("/verify-forget-password/:token", verifyNewPassword);


module.exports = userRoute;