// Empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express= require('express');

// Start up an instance of app
const app = express();

// Packages
const bodyParser = require('body-parser')
/* Middleware*/
//body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));

// Setup Server
const port= 8000;
const server= app.listen(port,()=>{
    console.log(`The server is up and running on localhost port ${port}`)
});

/*GET and POST routes. (the arrow functions will be executed whenever a request is sent to the route).*/ 
app.get("/gettingData", (request, response)=>{
    response.send(projectData);                 //send the data
});

//inserting the received data into projectData js object endpoint. (In the POST method's request, the data is located in its body.)
app.post("/savingData", (request, response)=>{
    projectData= request.body;
    response.send();                            //data is saved successfully
});