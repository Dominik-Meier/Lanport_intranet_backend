// https://bezkoder.com/node-js-express-sequelize-mysql/

// Load start args and export it for db config!
const config = process.argv[2];
module.exports = config;

//App imports
const express = require('express');
const bodyParser = require("body-parser");
const cors = require("cors");

//Create express app and port
const app = express();
const port = 3000;

//Sett app parameters and attributes
app.use(cors());
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({ extended: true, limit: '50mb'}));

// Load models and setup DB, DB is set up auto when tables are not existing!
// process.argv[2] is taking the config argument and passing it to the db setup
const db = require("./app/models");
db.sequelize.sync();

// Include routes which are served
require('./app/routes/index')(app);

//Start listening for requests
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
app.get('/', (req, res) => res.send('This ist the Rest-API for the Lanport-Intranet, here ist nothing for you as a browser!'));