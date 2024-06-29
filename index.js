const startupDebugger = require('debug')('app:startup');
const dbDebugger = require('debug')('app:db');

const config = require('config');

const helmet = require('helmet');
const morgan = require('morgan');

const Joi = require('joi');
const express = require('express');
const app = express();
const logger = require('./middleware/logger');

const courses = require('./routes/courses'); 
const home = require('./routes/home'); 

// Templating engine
app.set('view engine', 'pug');
app.set('views', './views');  // default

// Configuration
console.log("Appliction name: " + config.get('name'));
console.log("Mail server: " + config.get('mail.host'));
console.log("Mail password: " + config.get('mail.password'));


// Built in middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // key=value&key=value
app.use(express.static('public')); // key=value&key=value

// Third party middleware
app.use(helmet()); 

app.use('/api/courses', courses);
app.use('/', home);


if (app.get('env') === 'development'){
    app.use(morgan('tiny'));    
    startupDebugger("Morgan enabled...");  
}
startupDebugger('dubug kaj kortece')
// db work
dbDebugger('connected to the database..');

// Custom middleware function
app.use(logger);

app.use(function(req, res, next) {
    console.log('Authenticating...');
    next();
})



// PORT
// env server is set to 5000
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}..!!`)); 