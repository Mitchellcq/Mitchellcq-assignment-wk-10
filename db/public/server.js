// ==============================================================================
// DEPENDENCIES
// Series of npm packages that we will use to give our server useful functionality
// ==============================================================================

var express = require("express");
var path = require("path");
var fs = require("fs");
var notesArray = JSON.parse(fs.readFileSync('../db.json', "utf-8"));


// ==============================================================================
// EXPRESS CONFIGURATION
// This sets up the basic properties for our express server
// ==============================================================================

// Tells node that we are creating an "express" server
var app = express();

// Sets an initial port. We"ll use this later in our listener
var PORT = process.env.PORT || 8080;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/assets", express.static("./assets"));

// ================================================================================
// ROUTER
// The below points our server to a series of "route" files.
// These routes give our server a "map" of how to respond when users visit or request data from various URLs.
// ================================================================================

//HTML routes (complete)
// ================================================================================
app.get("/notes", function (req, res) {
    res.sendFile(path.join(__dirname, "../public/notes.html"));
});

// If no matching route is found default to home
app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "../public/index.html"));
});

//API routes
// ================================================================================
app.get("/api/notes", function (req, res) {
    res.json(notesArray);
});

app.post("/api/notes", function (req, res) {

    let newNote = req.body;
    let uniqueId = notesArray.length;
    console.log(uniqueId);
    newNote.id = uniqueId;
    notesArray.push(newNote);

    writeToDatabase(notesArray);
});

app.post("/api/notes/:id", function (res, req) {
    var id = req.body.id;

    var newNotesArray = removeByAttr(notesArray, 'id', id);

    writeToDatabase(newNotesArray);
});

// =============================================================================
// LISTENER
// The below code effectively "starts" our server
// =============================================================================

app.listen(PORT, function () {
    console.log("App listening on PORT: " + PORT);
});

// =============================================================================
// FUNCTIONS
// The below code is called by various api requests
// =============================================================================

function removeByAttr(arr, attr, value) {
    var i = arr.length;
    while (i--) {
        if (arr[i]
            && arr[i].hasOwnProperty(attr)
            && (arguments.length > 2 && arr[i][attr] === value)) {

            arr.splice(i, 1);

        }
    }
    return arr;
};

function writeToDatabase(arr) {
    fs.writeFileSync('../db.json', JSON.stringify(arr), function (err) {
        if (err) throw (err);
    });

    res.json(data);
};