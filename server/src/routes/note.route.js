const express = require("express");
const { createNote, getNotes, getNoteById, updateNoteById, deleteNoteById } = require("../controllers/note.controller");
const { isLoggedIn } = require("../middlewares/auth.middleware");
const upload = require("../middlewares/upload.middleware");

const noteRoute = express.Router();

noteRoute.post("/notes", isLoggedIn, createNote);         //upload.single("image"),
noteRoute.get("/notes", isLoggedIn, getNotes);                
noteRoute.get("/notes/:id", isLoggedIn, getNoteById);        
noteRoute.put("/notes/:id", isLoggedIn, updateNoteById);      
noteRoute.delete("/notes/:id", isLoggedIn, deleteNoteById); 

module.exports = noteRoute;