const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');

// Import Routes
const authRoutes = require('./routes/auth');
const postRoutes = require('./routes/posts');

dotenv.config();

// connect to DB
mongoose.connect(
    process.env.DB_CONNECT,
    { useNewUrlParser: true },
    () => console.log('Connected to DB!'));

// Moddleware
// app.use(express.json());
app.use(
    bodyParser.urlencoded({ extended: false })
);

//Route Middlewares
app.use('/api/user', authRoutes);
app.use('/api/posts', postRoutes);

app.listen(3000, () => console.log('Server up'));

