const notes = require("express").Router();
const uuid = require("../helpers/uuid.js");
const { readAndAppend, readFromFile } = require("../helpers/fsUtils.js");

// GET request reads db.json
notes.get("/notes", (req, res) => {
  console.info(`${req.method} request received for notes`);
  readFromFile("./db/db.json").then((data) => res.json(JSON.parse(data)));
});

// POST request for notes
notes.post("/notes", (req, res) => {
  console.info(`${req.method} request received to notes`);
  const { title, text } = req.body;

  // If all the required properties are present, then create a newNote with a unique ID
  if (title && text) {
    const newNote = {
      title,
      text,
      note_id: uuid(),
    };
    // Appends the newNote to the db.json file
    readAndAppend(newNote, "./db/db.json");

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
