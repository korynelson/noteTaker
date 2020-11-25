// Dependencies
// =============================================================
var express = require("express");
var fs = require("fs");
var path = require("path");

// Sets up the Express App
// =============================================================
var app = express();
var PORT = 8080;

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
  console.log("getting all notes...")
  const notes = JSON.parse(fs.readFileSync("./db/db.json"))
  return res.json(notes);
});

// Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});
