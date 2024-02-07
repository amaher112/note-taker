const notes = require("express").Router();
const { v4: uuidv4 } = require("uuid");
const { readAndAppend, readFromFile } = require("../helpers/fsUtils");

// GET /api/notes reads db.json

notes.get("/", (req, res) => {
  console.info(`${req.method} request received for notes`);
  readFromFile("../db/db.json").then((data) => res.json(JSON.parse(data)));
});
// POST /api/notes
notes.post("/", (req, res) => {
  console.info(`${req.method} request received to notes`);
  const { title, text } = req.body;

  // If all the required properties are present
  if (title && text) {
    // Variable for the object we will save
    const newNote = {
      title,
      text,
      note_id: uuidv4(),
    };

    readAndAppend(newNote, "../db/db.json");

    const response = {
      status: "success",
      body: newNote,
    };

    res.json(response);
  } else {
    res.json("Error in posting feedback");
  }
});

module.exports = notes;
