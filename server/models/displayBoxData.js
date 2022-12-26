const mongoose = require('mongoose')

const displayBoxData = new mongoose.Schema({
    imageName: String,
    description: String,
    author: String
}, { collection: "dboxdatas" });

module.exports = mongoose.model("dboxdata", displayBoxData)