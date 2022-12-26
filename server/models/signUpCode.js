const mongoose = require('mongoose')

const signupcode = new mongoose.Schema({
    code: String
});

module.exports = mongoose.model("signupcodes", signupcode)