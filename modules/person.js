const { uniqueId } = require('lodash');
const mongoose = require('mongoose');
const bcrypt=require('bcrypt')

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
    },
    username: {
        require: true,
        type: String
    },
    password: {
        require: true,
        type: String
    }
});

personSchema.pre('save', async function(next) {
    const person = this;

    // Hash the password only if it has been modified (or  in new)
    if (!person.isModified('password')) return next();

    try {
        //  Hash password generation
        const salt = await bcrypt.genSalt(10);

        // Hash password
        const hashedPassword = await bcrypt.hash(person.password, salt);

        // Override the plain password with the hashed one
        person.password = hashedPassword;
        next(); 
    }
    catch (error) {
return next(error);
    }
});

personSchema.methods.comparePassword = async function(candidatePassword){
    try {
      // Use bcrypt to compare the provided password with the hashed password
      const isMatch = await bcrypt.compare(candidatePassword, this.password);  
    }
     catch (error) {
        throw error;
    }
}

// Create person model
const person = mongoose.model('person', personSchema);
module.exports = person;


