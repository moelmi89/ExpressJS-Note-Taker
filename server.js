 const path = require("path");
 const express = require("express");
 const fs = require("fs");

//set express server
const app = express();

app.use(express.json());
app.use(express.static("public"))


//added port
const PORT = process.env.PORT || 3001;



//routes
app.get("/notes", function(req, res) {
    res.sendFile(path.join(mainPath, "notes.html"));
});