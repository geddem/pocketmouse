const express = require('express');
const app = express();
const path = require('path');
const PORT = process.env.PORT || 3500;

// Parse URL-encoded bodies (as sent by HTML forms)
app.use(express.urlencoded({limit: '50mb'}));

// Parse JSON bodies (as sent by API clients)
app.use(express.json({limit: '50mb'}));



app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//const main = require('.views/index.html');

/*
app.get('/', function(req, res) {

    res.send('Simple Web Application is UP');

});
*/

const header = (req, res, next) => {
    res.sendFile(path.join(__dirname, 'views', 'header.html'));
    next();
}

const footer = (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'header.html'));
}

const index = (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
}

const tasks = (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'tasks.js'));
}

var sampledataRouter = require('./routes/tasks');

//app.use('/', header);
app.use('/', sampledataRouter);

// Allow the include directory to be public
app.use('/include', express.static('include'))
app.use('/node_modules', express.static('node_modules'))


app.listen(PORT, function() {

    console.log('Pocket Mouse Web Application running on port: ' + PORT);

});