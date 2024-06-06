const { uniqueId } = require('lodash');
const mongoose = require('mongoose');

const personSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },

    age: {
        type: Number
    },

    work: {
        type: String,
        enum: ['chief', 'waiter', 'manager'],
        require: true
    },

    mobile: {
        type: Number,
        require: true,
        unique: true
    },

    email: {
        type: String,
        require: true,
    },
    address: {
        type: String,
    },

    salary: {
        type: Number,
        require: true
    }
});

    // Create person model
    const person = mongoose.model('person', personSchema);
    module.exports = person;

    
