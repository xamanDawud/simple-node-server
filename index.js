const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
const cors = require("cors");
app.use(cors());

let user = [
  { id: 1, name: "Jahanara Imam", email: "jahanaraimam@gmail.com" },
  { id: 2, name: "Sabiha Sultam", email: "sabihasultan@gmail.com" },
  { id: 3, name: "Samia Ali", email: "samiaali@gmail.com" },
];

app.get("/user", (req, res) => {
  res.send(user);
});
app.get("/", (req, res) => {
  res.send("Api is running");
});

app.listen(port, (req, res) => {
  console.log(`Port is running of ${port}`);
});
