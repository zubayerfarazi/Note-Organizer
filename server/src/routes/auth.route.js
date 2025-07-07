const express = require('express');
const { handleLogin, handleLogOut, handleRefreshToken } = require('../controllers/auth.controller');
const { isLoggedOut, isLoggedIn } = require('../middlewares/auth.middleware');

const authRoute = express.Router();

authRoute.post("/login", isLoggedOut, handleLogin);
authRoute.post("/logout", isLoggedIn, handleLogOut);
authRoute.get("/refresh-token", handleRefreshToken);
authRoute.get("/me", isLoggedIn, async (req, res) => {
  res.status(200).json({
    success: true,
    message: "User is authenticated",
    user: req.user,
  });
});

module.exports = authRoute;