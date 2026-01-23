const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const colors = require('colors');
const bootcamps = require('./routes/bootcamps'); //route files
const logger = require('./middleware/logger');
dotenv.config({path: './config/config.env'}); //load env vars



//connect to database
connectDB();
const app =express();


app.use(logger); //using logger middleware
//mount routers
app.use('/api/v1/bootcamps', bootcamps);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold));