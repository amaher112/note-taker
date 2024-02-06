const express = require("express");
const path = require("path");
const tasks = require('./db/db.json');
const api = require("./routes/notes.js");

const PORT = process.env.port || 3001;

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', );

app.use(express.static('public'));

// GET /notes returning notes.html
app.get("/notes", (req, res) =>
  res.sendFile(path.join(__dirname, "/public/notes.html"))
);
// GET* returns index.html
app.get("/*", (req, res) =>
res.sendFile(path.join(__dirname, "/public/index.html"))
);



app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT}`)
);