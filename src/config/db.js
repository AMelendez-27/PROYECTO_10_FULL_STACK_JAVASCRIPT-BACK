const mongoose = require('mongoose');

const connectDB = async () => {
  try {
  await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected');
  } catch (error) {
    console.log('Error connecting to the database');
  }
}

module.exports = {connectDB}