const mongoose = require("mongoose");

// const uri = process.env.MONGODB_URI;
const uri =
  "mongodb+srv://Akash:Akash@89712@review.n5j4acx.mongodb.net/?retryWrites=true&w=majority&appName=Review";

const connectDB = async () => {
  try {
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB connected");
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
