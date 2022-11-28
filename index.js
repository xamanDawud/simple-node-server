const express = require("express");
const { MongoClient, ServerApiVersion } = require("mongodb");
const app = express();
const port = process.env.PORT || 5000;
const cors = require("cors");

app.use(cors());
app.use(express.json());

let users = [
  { id: 1, name: "Jahanara Imam", email: "jahanaraimam@gmail.com" },
  { id: 2, name: "Sabiha Sultam", email: "sabihasultan@gmail.com" },
  { id: 3, name: "Samia Ali", email: "samiaali@gmail.com" },
];

// userName : dbMongo-2-0
// password : XzIlYDBiqLrwo1Ja

const uri =
  "mongodb+srv://dbMongo-2-0:XzIlYDBiqLrwo1Ja@cluster0.lgiglma.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

async function run() {
  try {
    const userCollection = client.db("NodeSimple").collection("users");
    app.post("/users", async (req, res) => {
      console.log("Post api is called");
      const user = req.body;
      const result = await userCollection.insertOne(user);
      user.id = result.insertedId;
      console.log(result);
      res.send(user);
    });

    app.get("/users", async (req, res) => {
      const cursor = userCollection.find({});
      const users = await cursor.toArray();
      res.send(users);
    });
  } finally {
  }
}

run().catch((err) => console.log(err));

app.get("/users", (req, res) => {
  if (req.query.name) {
    const search = req.query.name;
    const filtered = users.filter(
      (usr) => usr.name.toLowerCase().indexOf(search) >= 0
    );
    res.send(filtered);
  } else {
    res.send(users);
  }
});

// app.post("/users", (req, res) => {
//   console.log("Post api is called");
//   const user = req.body;
//   user.id = users.length + 1;
//   users.push(user);
//   console.log(user);
//   res.send(user);
// });

app.get("/", (req, res) => {
  res.send("Api is running");
});

app.listen(port, (req, res) => {
  console.log(`Port is running of ${port}`);
});
