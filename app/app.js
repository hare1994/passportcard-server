const http = require('http');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();

//initialize a simple http server
const server = http.createServer(app);

const port = 3000;

// For post request, encode the body
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

// Allow cors
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:4200'); // update to match the domain you will make the request from
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE,PATCH, OPTIONS');
    next();
});


// Import and mount the states Router
const statesRouter = require('./routes/states.js');
app.use('/states', statesRouter);


const expressServer = server.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});

module.exports = app;
