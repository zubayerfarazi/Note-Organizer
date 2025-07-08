const createError = require("http-errors");
const Note = require("../models/note.model");
const { successResponse } = require("../helper/response.helper");
const Category = require("../models/category.model");

const createNote = async (req, res, next) => {
  try {
    const { title, content, category } = req.body;
    const userId = req.user._id;
    const image = req.file?.path || null;

    const foundCategory = await Category.findOne({ name: category, user: userId });
    console.log(foundCategory)
    if (!foundCategory) throw createError(404, "Category not found!");

    const note = await Note.create({
      title,
      content,
      category: foundCategory._id,
      image,
      user: userId,
    });
    if (!note) throw createError(404, "Something is wrong!");

    return successResponse(res, {
      statusCode: 201,
      message: "note is created successfully!",
      payload: { note },
    });
  } catch (error) {
    next(error);
  }
};

const getNotes = async (req, res, next) => {
  try {
    const userId = req.user._id;

    const search = req.query.search || "";
    const category = req.query.category || null;
    const page = req.query.page ? Math.max(1, Number(req.query.page)) : 1;
    const limit = req.query.limit ? Math.max(1, Number(req.query.limit)) : 5;

    const escapeRegex = (text) => {
      return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
    };

    const searchRegex = new RegExp(".*" + escapeRegex(search) + ".*", "i");

    const filter = {
      user: userId,
      $or: [
        { title: { $regex: searchRegex } },
        { content: { $regex: searchRegex } },
      ],
    };

    if (category) {
      filter.category = category;
    }

    const notes = await Note.find(filter)
      .populate("category")
      .sort("-createdAt")
      .skip((page - 1) * limit)
      .limit(limit);

    const count = await Note.countDocuments(filter);

    return successResponse(res, {
      statusCode: 200,
      message: "Notes fetched successfully",
      payload: {
        notes,
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


const getNoteById = async (req, res, next) => {
  try {
    const noteId = req.params.id;
    const userId = req.user._id;

    const note = await Note.findOne({ _id: noteId, user: userId }).populate(
      "category"
    );

    if (!note) {
      throw createError(404, "Note not found!");
    }

    return successResponse(res, {
      statusCode: 200,
      message: "Note fetched successfully!",
      payload: { note },
    });
  } catch (error) {
    next(error);
  }
};

const updateNoteById = async (req, res, next) => {
  try {
    const noteId = req.params.id;
    // const userId = req.user._id;
    const updatedData = req.body;

    const note = await Note.findOneAndUpdate(
      { _id: noteId },
      { $set: updatedData },
      { new: true, runValidators: true }
    );

    if (!note) {
      throw createError(404, "Note not found or you do not have permission.");
    }

    return successResponse(res, {
      statusCode: 200,
      message: "Note updated successfully!",
      payload: { note },
    });
  } catch (error) {
    next(error);
  }
};

const deleteNoteById = async (req, res, next) => {
  try {
    const noteId = req.params.id;
    const userId = req.user._id;

    const note = await Note.findOneAndDelete({ _id: noteId, user: userId });

    if (!note) {
      throw createError(404, "Note not found or you do not have permission.");
    }

    return successResponse(res, {
      statusCode: 200,
      message: "Note deleted successfully!",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getNotes,
  createNote,
  getNoteById,
  updateNoteById,
  deleteNoteById,
};
