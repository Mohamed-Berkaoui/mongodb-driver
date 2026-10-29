const express = require("express");
const { MongoClient } = require("mongodb");

const app = express();

const URI =
  "mongodb+srv://mohamed:ljJd92Dia8Si7RfL@cluster0.heetub1.mongodb.net/";
const client = new MongoClient(URI);
const dbName = "todoapp";
const collectionName = "todos";

app.use(express.static(__dirname + "/styles"));

/**
 * @endpoint /
 * @description get the view (html page)
 */

app.get("/", async function (req, res) {
  const data = await client
    .db(dbName)
    .collection(collectionName)
    .find()
    .toArray();
  res.render("index.ejs", { todos: data });
});

/**
 * @endpoint /addtodo
 * @description add a new todo to then
 */

app.use(express.urlencoded({ extended: true }));
app.post("/addtodo", async function (req, res) {
  //req => headers,url,method , req.body =>{task:value}

  const newtodo = {
    isDone: false,
    task: req.body.task,
  };
  await client.db(dbName).collection(collectionName).insertOne(newtodo);
  res.redirect("/");
;
});

app.listen(3000, function () {
  client
    .connect()
    .then(() => console.log("connected to db"))
    .catch((e) => console.log(e.message));
  console.log("server running on port 3000");
});
