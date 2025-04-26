// routes/event.js
const express = require('express');
const router = express.Router();
const Event = require('../models/Event');

router.get('/', async (req, res) => {
    try {
      const events = await Event.find({});
      const list = events.map(e => ({
        eventID: e.eventID,
        eventName: e.eventName,
        organizer: e.organizer,
        number_of_reviews: e.reviews.length
      }));
      res.json(list);
    } catch (err) {
      res.status(500).json({ error: 'Server error' });
    }
  });
  
router.get('/:id', async (req, res) => {
    try {
      const event = await Event.findOne({ eventID: parseInt(req.params.id) });
      if (!event) {
        return res.status(404).json({ error: 'Event not found' });
      }
      res.json(event);
    } catch (err) {
      res.status(500).json({ error: 'Server error' });
    }
  });

router.post('/:id/review', async (req, res) => {
    const eventId = req.params.id;
    const reviewData = req.body;
  
    try {
      const event = await Event.findOne({ eventID: parseInt(eventId) });
      if (!event) {
        return res.status(404).json({ message: 'Event not found' });
      }
  
      event.reviews.push(reviewData);
  
      await event.save();
  
      res.status(200).json({ message: 'Review added successfully' });
    } catch (error) {
      console.error('Error adding review:', error);
      res.status(500).json({ message: 'Server error' });
    }
  });

module.exports = router;
