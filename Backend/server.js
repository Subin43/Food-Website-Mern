const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const userRoutes = require('./routes/userRoutes');
const amountRoutes = require("./routes/amountRoutes");
const foodRoutes = require("./routes/foodRoutes")

dotenv.config();

const app = express();

const PORT = process.env.PORT || 8000; // Set a default port if PORT is not provided in .env
const MongoUrl = process.env.MONGO_URL;

// Middleware
app.use(express.json());

// CORS Configuration
const corsConfig = {
  origin: '*',
  credentials: true,
  methods: ['GET', 'POST', 'DELETE', 'PUT'],
};

app.use(cors(corsConfig));
app.options('*', cors(corsConfig)); // Allow CORS preflight for all routes

// Routes
app.use('/user', userRoutes);
app.use('/food',foodRoutes);
app.use('/amount',amountRoutes);

mongoose
  .connect(MongoUrl)
  .then(() => {
    console.log('App connected to database');
    app.listen(PORT, () => {
      console.log(`App is listening to port: ${PORT}`);
    });
  })
  .catch((error) => {
    console.log('Error:', error.message);
  });
