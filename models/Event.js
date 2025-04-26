// models/Event.js
const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  id: String,
  level: Number,
  revieverName: String,
  date: String,
  message: String
}, { _id: false });

const eventSchema = new mongoose.Schema({
  eventID: Number,
  eventName: String,
  organizer: String,
  category: String,
  code: String,
  description: String,
  date: String,
  comments: Object,
  reviews: [reviewSchema],
  tags: [String]
});

module.exports = mongoose.model('Event', eventSchema);
