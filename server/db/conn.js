const mongoose = require('mongoose');
require("dotenv").config({ path: "./config.env" });

const credentials = process.env.ATLAS_CERT_PATH;
const Db = process.env.ATLAS_URI_CERT;

const connectDB = async () => {
  try {
    mongoose.set('strictQuery', true);
    await mongoose.connect(Db, {
      dbName: "sample_mflix",
      useNewUrlParser: true,
      useUnifiedTopology: true,
      tlsAllowInvalidCertificates: true,
      tlsCertificateKeyFile: credentials
    });

    console.log('MongoDB is Connected...');
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

// Schema for users of app
const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    date: {
        type: Date,
        default: Date.now,
    },
});
const User = mongoose.model('users', UserSchema);
User.createIndexes();

module.exports = {connectDB,User};