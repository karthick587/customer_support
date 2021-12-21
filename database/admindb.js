const { MongoClient } = require('mongodb');
const uri = "mongodb+srv://karthickraja:Ben12345#@cluster0.h7hwq.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
  const collection = client.db("test").collection("devices");
  // perform actions on the collection object
  client.close();
});







