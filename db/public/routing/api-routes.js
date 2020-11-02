const fs = require("fs");
var data = JSON.parse(fs.readFileSync("../db.json", "utf8"));

module.exports = function (app) {

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

        fs.writeFileSync('../db.json', JSON.stringify(notesArray));
    });

    app.get("/api/notes/:id", function (req, res) {

        res.json(notesArray[Number(req.params.id)]);

    });

    app.delete("/api/notes/:id", function (res, req) {
        var noteId = req.body.id;

        console.log(`Deleting note with id ${noteId}`);

        let newId = 0;
        notesArray = notesArray.filter(currentNote => {
            return currentNote.id != noteId;
        });
        for (currentNote of notesArray) {
            currentNote.id = newId;
            newId++;
        }

        fs.writeFileSync('../db.json', JSON.stringify(notesArray));
        res.json(data);

    });
}
