// server/index.js
const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const DB = path.join(__dirname, "./db.json");
const app = express();
app.use(cors());
app.use(express.json());

function readDB(){
  return JSON.parse(fs.readFileSync(DB, "utf8"));
}
function writeDB(data){
  fs.writeFileSync(DB, JSON.stringify(data, null, 2));
}

app.get("/cameras", (req, res) => {
  const db = readDB();
  const { location } = req.query;
  let list = db.cameras || [];
  if(location) list = list.filter(c => (c.location||"").toLowerCase() === location.toLowerCase());
  res.json(list);
});

app.post("/cameras", (req, res) => {
  const db = readDB();
  const cameras = db.cameras || [];
  const nextId = (cameras[cameras.length-1]?.id || 0) + 1;
  const newCam = { id: nextId, ...req.body };
  cameras.push(newCam);
  db.cameras = cameras;
  writeDB(db);
  res.status(201).json(newCam);
});

const port = 5000;
app.listen(port, ()=> console.log("Express API listening on", port));
