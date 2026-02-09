const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const colors = require('colors');
const morgan = require('morgan');
const errorHandler = require('./middleware/error');
const bootcamps = require('./routes/bootcamps'); //route files
const courses = require('./routes/courses'); //route files
const fileupload = require('express-fileupload');
const path = require('path');
//Load env vars
dotenv.config({ path: './config/config.env' }); 



//body parser
//create express app
const app = express();

//body parser
app.use(express.json());

//connect to database
connectDB();

// morgan middleware
if(process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}


//file upload
app.use(fileupload());

// Set static folder
app.use(express.static(path.join(__dirname, 'public')));

//Mount routers

app.use('/api/v1/bootcamps', bootcamps);
app.use('/api/v1/courses', courses);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold));

// Use error handler middleware
app.use(errorHandler);