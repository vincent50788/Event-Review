// // routes/event.js
// const express = require("express");
// const router = express.Router();
// const Event = require("../../models/Event");

// router.get("/", async (req, res) => {
//   try {
//     const events = await Event.find({});
//     const list = events.map((e) => ({
//       eventID: e.eventID,
//       eventName: e.eventName,
//       organizer: e.organizer,
//       number_of_reviews: e.reviews.length,
//     }));
//     res.json(list);
//   } catch (err) {
//     res.status(500).json({ error: "Server error" });
//   }
// });

// router.get("/:id", async (req, res) => {
//   try {
//     const event = await Event.findOne({ eventID: parseInt(req.params.id) });
//     if (!event) {
//       return res.status(404).json({ error: "Event not found" });
//     }
//     res.json(event);
//   } catch (err) {
//     res.status(500).json({ error: "Server error" });
//   }
// });

// router.post("/:id/review", async (req, res) => {
//   const eventId = req.params.id;
//   const reviewData = req.body;

//   try {
//     const event = await Event.findOne({ eventID: parseInt(eventId) });
//     if (!event) {
//       return res.status(404).json({ message: "Event not found" });
//     }

//     event.reviews.push(reviewData);

//     await event.save();

//     res.status(200).json({ message: "Review added successfully" });
//   } catch (error) {
//     console.error("Error adding review:", error);
//     res.status(500).json({ message: "Server error" });
//   }
// });

// module.exports = router;

// routes/event.js
const express = require("express");
const router = express.Router();
const Event = require("../../models/Event");

/**
 * @route   GET /apis/v1/event
 * @desc    Get all events with basic info
 * @access  Public
 */
router.get("/", async (req, res) => {
  try {
    const events = await Event.find({}).select(
      "eventID eventName organizer category reviews"
    );

    if (!events || events.length === 0) {
      return res.status(404).json({ message: "No events found" });
    }

    const list = events.map((e) => ({
      eventID: e.eventID,
      eventName: e.eventName,
      organizer: e.organizer,
      category: e.category,
      number_of_reviews: e.reviews ? e.reviews.length : 0,
    }));

    res.json(list);
  } catch (err) {
    console.error("Error fetching events:", err.message);
    res.status(500).json({ error: "Server error", message: err.message });
  }
});

/**
 * @route   GET /apis/v1/event/:id
 * @desc    Get single event by ID with full details
 * @access  Public
 */
router.get("/:id", async (req, res) => {
  try {
    const eventId = parseInt(req.params.id);

    if (isNaN(eventId)) {
      return res.status(400).json({ error: "Invalid event ID" });
    }

    const event = await Event.findOne({ eventID: eventId });

    if (!event) {
      return res.status(404).json({ error: "Event not found" });
    }

    res.json(event);
  } catch (err) {
    console.error("Error fetching event:", err.message);
    res.status(500).json({ error: "Server error", message: err.message });
  }
});

/**
 * @route   POST /apis/v1/event/:id/review
 * @desc    Add a review to an event
 * @access  Public
 */
router.post("/:id/review", async (req, res) => {
  try {
    const eventId = parseInt(req.params.id);
    const reviewData = req.body;

    if (isNaN(eventId)) {
      return res.status(400).json({ error: "Invalid event ID" });
    }

    // Validate review data
    if (!reviewData.revieverName || !reviewData.level) {
      return res.status(400).json({
        error: "Invalid review data",
        message: "Name and rating level are required",
      });
    }

    // Ensure level is a number between 1-5
    const level = parseInt(reviewData.level);
    if (isNaN(level) || level < 1 || level > 5) {
      return res.status(400).json({
        error: "Invalid rating",
        message: "Rating must be a number between 1 and 5",
      });
    }

    const event = await Event.findOne({ eventID: eventId });

    if (!event) {
      return res.status(404).json({ error: "Event not found" });
    }

    // Ensure reviews array exists
    if (!event.reviews) {
      event.reviews = [];
    }

    // Add the review to the event
    event.reviews.push({
      id: reviewData.id || Date.now().toString(),
      revieverName: reviewData.revieverName,
      level: level,
      date: reviewData.date || new Date().toISOString().split("T")[0],
      message: reviewData.message || "",
    });

    await event.save();

    res.status(201).json({
      message: "Review added successfully",
      eventID: eventId,
      reviewCount: event.reviews.length,
    });
  } catch (error) {
    console.error("Error adding review:", error.message);
    res.status(500).json({ error: "Server error", message: error.message });
  }
});

module.exports = router;
