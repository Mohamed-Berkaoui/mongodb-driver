const { MongoClient } = require("mongodb");

const URI =
  "mongodb+srv://mohamed:ljJd92Dia8Si7RfL@cluster0.heetub1.mongodb.net/";
const client = new MongoClient(URI);

client.connect();

client
  .db("todoapp")
  .collection("todos")
  .find()
  .toArray()
  .then((res) => console.log(res));


  client.close()