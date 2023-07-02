const express = require('express'); //Requiring express module
const mongoose = require('mongoose'); //Requiring Mongoose module for database connectivity
const dotenv = require('dotenv'); //Requiring express module
const morgan = require('morgan'); //Https request logger middleware ***** -> only for dev
const colors = require('colors');  //This is an additional module which I prefer to use helps me to distinguish results over the  console. ***** -> only for dev .
const connectDB = require('./config/db');

const app = express();

//Load env vars 
dotenv.config({path:'./config/config.env'});

//connect to database
connectDB();

app.use(express.urlencoded({
    extended: false
}));
app.use(express.json());


//Route files 
const questions = require('./Routes/questions');
const options = require('./Routes/options');


//Dev logging middleware 
if(process.env.NODE_ENV === 'development'){
    app.use(morgan('dev'));
}

//Defining the PORT 
const PORT = process.env.PORT || 5500;

//Mount the Routers 
app.use('/api/v1/questions',questions);
app.use('/api/v1/options',options);

//listening to the server 
const server = app.listen(PORT , console.log(`Server is running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold)
);
