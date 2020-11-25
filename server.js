// Dependencies
// =============================================================
var express = require("express");
var fs = require("fs");
var path = require("path");
var crypto = require("crypto");

// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 8080;

// Serve static content for the app from the "public" directory in the application directory.
app.use(express.static("public"));

// Parse request body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Routes
// =============================================================

// Basic route that sends the user first to the AJAX Page

app.get("/notes", function(req, res) {
  res.sendFile(path.join(__dirname + "/public","notes.html" ));
});

app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname + "/public", "index.html"));

});

app.get("/index", function(req, res) {
  res.sendFile(path.join(__dirname + "/public", "index.html"));
});

// Displays all notes
app.get("/api/notes", function(req, res) {
  const notes = JSON.parse(fs.readFileSync("./db/db.json"))
  return res.json(notes);
});

// Post new notes
app.post("/api/notes", function(req,res) {
  id = crypto.randomBytes(16).toString("hex");
  req.body.id = id;
  const notes = JSON.parse(fs.readFileSync("./db/db.json"))
  notes.push(req.body)
  fs.writeFile("./db/db.json", JSON.stringify(notes), (err) => {
    if (err) throw err;
  });
  return res.json(notes);
});

// Delete notes
app.delete("/api/notes:id", function(req,res) {
  let deleteNote = req.params.id;
  const notes = JSON.parse(fs.readFileSync("./db/db.json"));
  const newNotes = notes.filter(function(item) {
    return item.id != deleteNote;
  })
  fs.writeFile("./db/db.json", JSON.stringify(newNotes), (err) => {
    if (err) throw err;
  });
  return res.json(newNotes);
});

// Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});
