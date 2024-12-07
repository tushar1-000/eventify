const mongoose = require("mongoose");

uri = process.env.MONGODB_URI;

// uri ="mongodb+srv://tusharyadav:tusharyadav@cluster0.haal3.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

async function connectDB() {
  try {
    await mongoose.connect(uri);
    console.log("Database connected...");
  } catch (err) {
    console.log(err);
  }
}

module.exports = connectDB;
