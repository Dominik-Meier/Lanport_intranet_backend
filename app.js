// add timestamps in front of log messages
require('console-stamp')(console, 'yyyy-mm-dd-HH:MM:ss.l');

// Load start args and export it for db config!
const config = process.argv[2];
const dbName = process.argv[3];
const basePath = __dirname;

module.exports = {
    config: config,
    dbName: dbName,
    basePath: basePath,
    sendMsg: sendMsg
}

//App imports
const express = require('express');
const bodyParser = require("body-parser");
const cors = require("cors");

//Create express app and port
const app = express();
const port = 3000;

//WebSocket
const WebSocket  = require('ws');
const wss = new WebSocket.Server({port: 3001});

wss.on('connection', ws => {
    console.log('Client connected');
    ws.on('close', () =>{
        console.log("Client disconnected");
    })
})

function sendMsg(msg) {
    console.log('sending new message: ', msg.toString());
    wss.clients.forEach( client => client.send(JSON.stringify(msg)));
}

//Set app parameters and attributes
app.use(cors());
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({ extended: true, limit: '50mb'}));

// Load models and setup DB, DB is set up auto when tables are not existing!
const db = require("./app/models");
db.sequelize.sync();

// Include routes which are served
require('./app/routes/index')(app);

//Start listening for requests
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
app.get('/', (req, res) => res.send('This is the Rest-API for the Lanport-Intranet, here ist nothing for you as a browser!'));