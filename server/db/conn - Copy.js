const { MongoClient, ServerApiVersion } = require("mongodb");
const fs = require('fs');
//require("dotenv").config({ path: "./config.env" });
const credentials = process.env.ATLAS_CERT_PATH;
const Db = process.env.ATLAS_URI;
const myDB=process.env.MY_DB;

const client = new MongoClient(Db, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  sslKey: credentials,
  sslCert: credentials,
  serverApi: ServerApiVersion.v1
});
 
var _db;


module.exports = {
  connectToServer: function (callback) {
    client.connect(function (err, db) {
      // Verify we got a good "db" object
      if (db)
      {
        _db = db.db(myDB);
        console.log("Successfully connected to MongoDB."); 
      }
      if (err) return callback(err);
    });
  },
 
  getDb: function () {
    return _db;
  },
};


/*

const { MongoClient, ServerApiVersion } = require('mongodb');
const fs = require('fs');

const credentials = 'I:\Certs\X509-cert-2983353809093799131.pem'

const client = new MongoClient('mongodb+srv://eon.wyuvxqf.mongodb.net/?authSource=%24external&authMechanism=MONGODB-X509&retryWrites=true&w=majority', {
  sslKey: credentials,
  sslCert: credentials,
  serverApi: ServerApiVersion.v1
});

async function run() {
  try {
    await client.connect();
    const database = client.db("Interfaces");
    const collection = database.collection("Sample");
    const docCount = await collection.countDocuments({});
    console.log(docCount);
    // perform actions using client
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}

run().catch(console.dir);

*/