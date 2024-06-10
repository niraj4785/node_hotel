var express = require('express')
const app = express();
const db = require('./db');
const bodyParser = require('body-parser');
app.use(bodyParser.json());  // req.body
const MenuItem = require('./modules/MenuItem')
require('dotenv').config();

const PORT = process.env.PORT || 4000;

app.get('/', (req,res)=>{
    res.send('welcome to our Hotel ...How can i help you ?')
});


const personRoutes = require('./routes/personRoutes');
app.use('/person',personRoutes)

  
const menuRoutes =require('./routes/menuRoutes');
app.use('/menu',menuRoutes);

app.listen(PORT, ()=>{
    console.log('Listening on port 4000');
})