const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({});

const review = mongoose.model("review", reviewSchema);
module.exports = review;
