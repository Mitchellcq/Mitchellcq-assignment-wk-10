const fs = require("fs");
var data = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));

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

        res.json(data[Number(req.params.id)]);

    });

    app.delete("/api/notes/:id", function (res, req) {
        var id = req.body.id;

        console.log(`Deleting note with id ${noteId}`);

        var i = notesArray.length;
        while (i--) {
            if (notesArray[i]
                && notesArray[i].hasOwnProperty('id')
                && notesArray[i].id === id) {

                notesArray.splice(i, 1);

            }
        }
        fs.writeFileSync('../db.json', JSON.stringify(notesArray));

        res.json(data);

    });
}
