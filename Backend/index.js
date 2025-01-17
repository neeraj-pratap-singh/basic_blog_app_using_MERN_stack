const express = require('express');
const mongoose = require('mongoose');
const cors =  require('cors')
const app = express();
const PORT = process.env.PORT || 5500;
const config = require('./config/config');
const dotenv = require("dotenv");
dotenv.config();
app.use(express.json());

// Connect to MongoDB
mongoose.connect(config.MONGODB_URI).then(() => {
    console.log('Connected to MongoDB');
}).catch((err) => {
    console.error('Error connecting to MongoDB', err);
});
// Allow all origins
app.use(cors());


// Routes
const authRoutes = require('./routes/authRoutes');
const blogRoutes = require('./routes/blogRoutes');
const profileRoutes = require('./routes/profileRoutes');

app.use('/auth', authRoutes);
app.use('/blogs', blogRoutes);
// app.use('/profile', profileRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});