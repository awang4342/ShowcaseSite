const mongoose = require('mongoose')

const user = new mongoose.Schema({
    username: String,
    password: String
}, { collection: "users" });

module.exports = mongoose.model("users", user)