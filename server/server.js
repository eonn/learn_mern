// app.js

const express = require('express');
const {connectDB,User} = require("./db/conn");
const cors = require('cors');
require("dotenv").config({ path: "./config.env" });

// routes
const books = require('./routes/api/books');

const app = express();

// Connect Database
const mDb = connectDB();

// cors
app.use(cors({ origin: true, credentials: true }));

// Init Middleware
app.use(express.json({ extended: false }));

app.get('/', (req, res) => res.send('Hello world!'));

// use Routes
app.use('/api/books', books);

app.post("/register", async (req, resp) => {
    try {
        const user = new User(req.body);
        let result = await user.save();
        result = result.toObject();
        if (result) {
            delete result.password;
            resp.send(req.body);
            console.log(result);
        } else {
            console.log("User already register");
        }
 
    } catch (e) {
        resp.send("Something Went Wrong");
    }
});

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));