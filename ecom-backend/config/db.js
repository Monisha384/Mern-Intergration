const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DB_url);
    console.log("MongoDB Connected Successfully");
  } catch (error) {
    console.error("Database Connection Failed:", error);
    process.exit(1);
  }
};

module.exports = connectDB;