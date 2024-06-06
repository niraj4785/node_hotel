const express = require('express')
const router = express.Router();
const person = require('./../modules/person');

//   Post route to add a person
router.post('/', async (req, res) => {
    try {
        const data = req.body //Assuming the request body contain the person data

        // Create a new person documen using mongoose model
        const newPerson = new person(data);

        // save the new person to the database 
        const response = await newPerson.save();
        console.log('data saved');
        res.status(200).json(response);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error: 'internal server error' });

    }
});

router.get('/', async (req, res) => {
    try {
        const data = await person.find();
        console.log('data fetched');
        res.status(200).json(data);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'internal server error' });
    }
});

router.get('/:workType', async (req, res) => {
    try {
        const workType = req.params.workType //Extract the work type from the URL Parameter 
        if (workType == 'chief' || workType == 'manager' || workType == 'waiter') {
            const response = await person.find({ work: workType });
            console.log('Response fetched');
            res.status(200).json(response);
        }

        else {
            res.status(404).json({ error: 'invalid work type' });
        }
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error: 'internal server error' });
    }
});

router.put('/:id', async(req, res) => {
    try {
        const personId = req.params.id; //extract the id from the url parameter
        const updatedPersonData = req.body;  //update data from the person
        const response = await person.findByIdAndUpdate(personId, updatedPersonData,
            {
                new: true,  //Return the updated document
                runValidators: true  //Run Mongoose validation
            });

    if(!response){
        return res.status(404).json({error: 'person not found'});
    }
console.log('data updated');
res.status(200).json(response);

    } 
    catch (error) {
        console.log(error);
        res.status(500).json({ error: 'internal server error' });
    }
});

router.delete('/:id', async(req,res) => {
    try {
        const personId = req.params.id; //extract the id from the url parameter
        const response = await person.findByIdAndDelete(personId);
   
        if(!response){
            return res.status(404).json({error: 'person not found'});
        }
    console.log('Data Deleted');
    res.status(200).json({message:'Person deleted successfully'});
    } 

    catch (error) {
            console.log(error);
            res.status(500).json({ error: 'internal server error' });
        }
    
})

module.exports = router;
