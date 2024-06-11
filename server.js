var express = require('express')
const app = express();
const db = require('./db');
require('dotenv').config();
const passport = require('./auth')
const bodyParser = require('body-parser');
app.use(bodyParser.json());  // req.body
const PORT = process.env.PORT || 4000;




// Middleware function
const logRequest = (req, res, next) => {
    console.log(`[${new Date().toLocaleString()}] Request Made to : ${req.originalUrl}`);
    next(); // Move on to the next phase
}
app.use(logRequest)

app.use(passport.initialize());
const localAuthMiddleware = passport.authenticate('local',{session:false});

app.get('/', function (req, res) {
    res.send('welcome to our Hotel ...How can i help you ?')
});

const personRoutes = require('./routes/personRoutes');
app.use('/person',localAuthMiddleware,  personRoutes)


const menuRoutes = require('./routes/menuRoutes');
app.use('/menu',localAuthMiddleware, menuRoutes);

app.listen(PORT, () => {
    console.log('Listening on port 4000');
})