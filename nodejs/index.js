const express = require('express');
const mongoose = require('mongoose');

const app = express();
const port = 3000;

app.use(express.json());

const uri =
  "mongodb+srv://Akash:Akash%4089712@review.n5j4acx.mongodb.net/?retryWrites=true&w=majority&appName=Review";


mongoose.connect(uri)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

const eventRoutes = require('./routes/event');
app.use('/apis/v1/event', eventRoutes);

app.get('', (req, res) => {
    res.send('Hello from Node.js!');
});

app.listen(port, () => {
    console.log('Server running at httplocalhost${port}');
});
