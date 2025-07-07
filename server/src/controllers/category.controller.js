const createError = require("http-errors");
const Category = require("../models/category.model");
const { successResponse } = require("../helper/response.helper");

const createCategory = async (req, res, next) =>{
    try {
        const {name} = req.body;
        const userId = req.user._id;

        const category = await Category.create({name, user: userId});
        if(!category) throw createError(404, "Something is wrong!");

        return successResponse(res, {
            statusCode: 201,
            message: "Category is created successfully!",
            payload: {category}
        })
    } catch (error) {
        next(error)
    }
}

const getCategory = async (req, res, next) =>{
    try {
        const userId = req.user._id;

        const categories = await Category.find({user: userId});
        if(!categories) throw createError(404, "No Category Found!");

        return successResponse(res, {
            statusCode: 200,
            message: "Categories are returned!",
            payload: {categories}
        })
    } catch (error) {
        next(error);
    }
}

module.exports = {createCategory, getCategory}