const mongoose = require("mongoose");
mongoose.connect( process.env.MONGODB_URI ||
    "mongodb://20.31.133.140:27017/booksData",{ useNewUrlParser: true });

module.exports.books = require("./books.js");
