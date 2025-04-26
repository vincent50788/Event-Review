const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const app = express();
const cors = require("cors");
const Portfolio = require("./model/review");
const connectDB = require("../config/database");

app.use(express.json());
app.use(bodyParser.json());
// app.use(express.static('public'));
app.use(express.static(path.join(__dirname, "../public")));

// CORS configuration
app.use(
  cors({
    origin: ["https://.vercel.app"],
    methods: ["POST", "GET"],
    credentials: true,
  })
);

// Route to serve the review.html page
app.get("/make-review", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/review.html"));
});

app.post("", async (req, res) => {});

app.get("", async (req, res) => {});

app.post("", async (req, res) => {});

const PORT = process.env.PORT || 4000;
console.log(process.env.PORT);
connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Failed to connect to the database", error);
  });
