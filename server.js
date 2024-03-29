const express = require("express");
const path = require("path");
const api = require("./routes/notes.js");

const PORT = process.env.PORT || 3001;

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use('/api', api);



// GET /notes returns notes.html
app.get("/notes", (req, res) =>
  res.sendFile(path.join(__dirname, "/public/notes.html"))
);
// Anything else returns index.html
app.get("*", (req, res) =>
res.sendFile(path.join(__dirname, "/public/index.html"))
);



app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT}`)
);