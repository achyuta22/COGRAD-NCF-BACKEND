const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();
// Initialize the app
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB Connection
const dbURI = process.env.dburi; 
mongoose.connect(dbURI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log('Error connecting to MongoDB:', err));

// Define Schema
const teacherSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: { type: Number, required: true },
  qualification: { type: String, required: true },
  subject: { type: String, required: true },
  designation: { type: String, required: true },
  teachingStage: { type: String, required: true },
  currentSchool: { type: String, required: true },
  teachingExperience: { type: Number, required: true },
});

// Define Model
const Teacher = mongoose.model('Teacher', teacherSchema);

// Routes
app.post('/api/teachers', async (req, res) => {
  try {
    const newTeacher = new Teacher(req.body);
    await newTeacher.save();
    res.status(201).json({ message: 'Teacher information saved successfully!' });
  } catch (error) {
    res.status(400).json({ message: 'Error saving teacher information', error });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
