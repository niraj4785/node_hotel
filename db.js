const mongoose = require('mongoose');
require('dotenv').config();

// ** define the mongoDB connection URL
// const mongoURL = process.env.MONGODB_URL_LOCAL
const mongoURL=process.env.MONGODB_URL;


// set up mongoDB connection
mongoose.connect(mongoURL);

//Get the default connection 
// mongoose maintain the default connection object representing the MongoDB connection
const db = mongoose.connection;

//  define event Listeners for database connection

db.on('connected',()=>{
    console.log('Connected to mongoDB server');
})


db.on('error',(err)=>{
    console.log('mongoDB connection error:',err);
})


db.on('disconnected',()=>{
    console.log('mongoDB disconnected');
})

// Export the database connection

module.exports = db;