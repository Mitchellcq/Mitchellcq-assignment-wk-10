const fs = require("fs");
const bodyParser = require('body-parser');
var data = fs.readFileSync("./db/db.json", "utf8");
var notesArray = JSON.parse(data);

module.exports = function (app) {

    //API routes
    // ================================================================================
    app.get("/api/notes", function (req, res) {
        console.log(notesArray);
        res.json(notesArray);
    });

    app.get("/api/notes/:id", function (req, res) {
        res.json(notesArray[Number(req.params.id)]);
    });

    app.post("/api/notes", function (req, res) {

        let newNote = req.body;
        let uniqueId = (notesArray.length).toString();
        console.log(uniqueId);
        newNote.id = uniqueId;
        notesArray.push(newNote);

        fs.writeFileSync('./db/db.json', JSON.stringify(notesArray));

        res.json(notesArray);
    });

    app.delete("/api/notes/:id", function (res, req) {
        console.log(req.params.id);
        var noteId = req.params.id;

        console.log(`Deleting note with id ${noteId}`);

        let newId = 0;
        notesArray = notesArray.filter(currentNote => {
            return currentNote.id != noteId;
        });
        for (currentNote of notesArray) {
            currentNote.id = newId.toString();
            newId++;
        }

        fs.writeFileSync('./db/db.json', JSON.stringify(notesArray));
        res.json(notesArray);

    });
}
