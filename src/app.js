const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const app = express();
const cors = require("cors");
const connectDB = require("../config/database");

// Middleware
app.use(express.json());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "../public")));

// CORS configuration - update with your actual deployed domain
app.use(
  cors({
    origin: [
      "https://event-review-app.vercel.app",
      "http://localhost:3000",
      "http://localhost:4000",
    ],
    methods: ["POST", "GET"],
    credentials: true,
  })
);

// API routes
const eventRoutes = require("./routes/event");
app.use("/apis/v1/event", eventRoutes);

// HTML routes
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/index.html"));
});

app.get("/make-review", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/review.html"));
});

app.get("/eventDetails", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/eventDetails.html"));
});

// Health check endpoint
app.get("/api/health", (req, res) => {
  res.status(200).json({ status: "ok", timestamp: new Date().toISOString() });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    error: "Server error",
    message:
      process.env.NODE_ENV === "production"
        ? "An unexpected error occurred"
        : err.message,
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: "Not found", path: req.path });
});

// Start the server
const PORT = process.env.PORT || 4000;
connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Failed to connect to the database", error);
    process.exit(1);
  });
