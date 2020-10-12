// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const morgan = require('morgan');

const app = express();
// Start up an instance of app

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use(morgan('tiny'));

// Cors for cross origin allowance

// Initialize the main project folder
app.use(express.static('website'));


//# Get Requests
app.get('/allData', (req , res) => {
    res.send(projectData);
});

//# Post Requests
app.post('/addData', (req, res) => {
    let newEntry = request.body;

    projectData['date'] = newEntry.date;
    projectData['temp'] = newEntry.temp;
    projectData['feel'] = newEntry.feeling;

    res.send(projectData);
})


// Setup Server

const port = process.env.port || 3000 ;

app.listen(port, () => console.log(`your app running at http://localhost:${port}`));