const express = require("express");
const { default: mongoose } = require("mongoose");

const app = express();

const URI =
  "mongodb+srv://mohamed:ljJd92Dia8Si7RfL@cluster0.heetub1.mongodb.net/";

const todoSchema = new mongoose.Schema(
  {
    task: { type: String, required: true },
    isDone: { type: Boolean, default: false },
  },
  { versionKey: false },
);

const TodoModel = mongoose.model("todo", todoSchema);

app.use(express.static(__dirname + "/styles"));

/**
 * @endpoint /
 * @description get the view (html page)
 */

app.get("/", async function (req, res) {
  const data = await TodoModel.find();

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
    task: req.body.task,
  };
  await TodoModel.insertOne(newtodo);
  res.redirect("/");
});

app.get("/update/:id", async function (req, res) {
  const todoId = req.params.id;
  await TodoModel.updateOne({ _id: todoId }, { $set: { isDone: true } });
  res.redirect("/");
});

app.get("/delete/:id", async function (req, res) {
  const todoId = req.params.id;
  await TodoModel.deleteOne({ _id: todoId });
  res.redirect("/");
});

app.listen(3000, function () {
  mongoose
    .connect(URI, { dbName: "test" })
    .then(() => console.log("connected to db"))
    .catch((e) => console.log(e.message));
  console.log("server running on port 3000");
});
