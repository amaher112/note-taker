const fs = require('fs');
const deleteRoute = require("express").Router();

deleteRoute.delete('/api/notes/:id', (req, res) => {
  // Get the id parameter from the request URL
  const id = req.params.id;

  // Read the notes from the db.json file
  fs.readFile('./db/db.json', 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Server error');
    }

    // Parse the data as JSON
    const notes = JSON.parse(data);

    // Find the index of the note with the given id
    const index = notes.findIndex(note => note.id === id);

    // If the note with the given id is found
    if (index !== -1) {
      // Remove the note from the notes array
      notes.splice(index, 1);

      // Write the updated notes to the db.json file
      fs.writeFileSync('./db/db.json', JSON.stringify(notes));
    } else {
      // If the note with the given id is not found, send a response indicating it was not found
      res.status(404).send('Note not found');
    }
  });
});

module.exports = deleteRoute;