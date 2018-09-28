const express = require("express");
const app = express();
const cors = require("cors");
const path = require("path");

app.use(cors());

app.get("/", (req,res,next) => {
    res.sendFile(__dirname+"/1.json");
})

app.listen(4000);