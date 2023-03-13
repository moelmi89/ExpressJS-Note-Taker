 const path = require("path");
 const express = require("express");
 const fs = require("fs");
 const { v4: uuidv4 } = require("uuid");

//set express server
const app = express();

app.use(express.json());
app.use(express.static("public"))
app.use(express.urlencoded({ extended: true }));

//added port
const PORT = process.env.PORT || 3001;



//routes
app.get("/notes", function(req, res) {
    res.sendFile(path.join(__dirname, '/notes.html'))
});



app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "index.html"));
});

app.post("/api/notes", function(req, res) {
    const { title, text } = req.body;
    // Makes a new note if the tite and body has been included
    if (req.body) {
      const newNote = {
        // function that creates the ID for us
        id: uuidv4(),
        title,
        text,        
      };
  
      // this will read the current db.json data
      fs.readFile("./db/db.json", "utf8", (err, data) => {
        if (err) {
          console.error(err);
        } else {
            const dbNotes = JSON.parse(data);
             dbNotes.push(newNote);
  
          fs.writeFileSync("./db/db.json", JSON.stringify(dbNotes)); 
          
          res.status(200).json(dbNotes);
        }
      });     
    }
});

//API DELETE Requests: 
app.delete("/api/notes/:id", function(req, res) {

    //read data
    var savedNotes = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
    var noteID = req.params.id;
    var newID = 0;

    savedNotes = savedNotes.filter(currentNote => {

        return currentNote.id != noteID;

    })

    for (currentNote of savedNotes) {
        currentNote.id = newID.toString();
        newID++;
    }

    fs.writeFileSync("./db/db.json", JSON.stringify(savedNotes));
    return res.json(savedNotes);
});



app.listen(PORT, () => {
    console.log(`App listening on PORT: ${PORT}`);
  });