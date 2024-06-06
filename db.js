const mongoose = require('mongoose');

//define the mongoDB connection URL
const mongoURL = 'mongodb://localhost:27017/hotels'


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