const express = require("express");
const { createCategory, getCategory } = require("../controllers/category.controller");
const { isLoggedIn } = require("../middlewares/auth.middleware");

const categoryRoute = express.Router();

categoryRoute.post("/categories", isLoggedIn, createCategory); 
categoryRoute.get("/categories", isLoggedIn, getCategory);

module.exports = {categoryRoute}