// Dependencies
// =============================================================
var express = require("express");
var fs = require("fs");
var path = require("path");

// Sets up the Express App
// =============================================================
var app = express();
var PORT = 8080;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


// Routes
// =============================================================

// Basic route that sends the user first to the AJAX Page

app.get("/notes", function(req, res) {
  res.sendFile(path.join(__dirname + "/public", "notes.html"));
});

app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname + "/public", "index.html"));
});

app.get("/index", function(req, res) {
  res.sendFile(path.join(__dirname + "/public", "index.html"));
});

// Displays all notes
app.get("/api/notes", function(req, res) {
  console.log("getting all notes...")
  const notes = JSON.parse(fs.readFileSync("./db/db.json"))
  console.log(notes)
  return res.json(notes);
});


// Create New Characters - takes in JSON input
app.post("/api/characters", function(req, res) {
  // req.body hosts is equal to the JSON post sent from the user
  // This works because of our body parsing middleware
  var newcharacter = req.body;

  console.log(newcharacter);

  // We then add the json the user sent to the character array
  characters.push(newcharacter);

  // We then display the JSON to the users
  res.json(newcharacter);
});

// Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});
