const mongoose = require('mongoose');
require("dotenv").config({ path: "./config.env" });

const credentials = process.env.ATLAS_CERT_PATH;
const Db = process.env.ATLAS_URI_CERT;

const connectDB = async () => {
  try {
    mongoose.set('strictQuery', true);
    await mongoose.connect(Db, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      ssl: true,
      sslKey: `${credentials}`,
      sslCert: `${credentials}`,
      
    });

    console.log('MongoDB is Connected...');
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

module.exports = connectDB;