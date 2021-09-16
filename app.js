#!/usr/bin/env node

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
    sendMsg: sendMsg,
}

//TODO kitchen tool tell ingredient or meal out of stock
//TODO menuItem each meal can only once be selected
//TODO secure orders that only esssens_pass people can order
//TODO time window to order stuff as user -> kitchenTool can order any time

//TODO what ware we doing with no full team on challonge creation?
//TODO role based resource access
//TODO check if there is a way to delete sess as I do not have an exp date
//TODO check sync of data -> seats -> are only synced on user login
//TODO create useful logs statements
//TODO write tests
//App imports
const express = require('express');
const bodyParser = require("body-parser");
const cors = require("cors");
const morgan = require('morgan');
const winston = require('winston');
const helmet = require("helmet");
const WebSocket  = require('ws');
const db = require("./app/models");
require('dotenv').config();

//Create express app and port
const app = express();

//Secure with helmet
app.use(helmet.contentSecurityPolicy());
app.use(helmet.dnsPrefetchControl());
app.use(helmet.expectCt());
app.use(helmet.frameguard());
app.use(helmet.hidePoweredBy());
app.use(helmet.hsts());
app.use(helmet.ieNoOpen());
app.use(helmet.noSniff());
app.use(helmet.permittedCrossDomainPolicies());
app.use(helmet.referrerPolicy());
app.use(helmet.xssFilter());

//WebSocket
const wss = new WebSocket.Server({port: 3001});

wss.on('connection', ws => {
    logger.info('Client connected');
    ws.on('close', () =>{
        logger.info("Client disconnected");
    })
})

function sendMsg(msg) {
    logger.info('sending new message: ', msg.toString());
    wss.clients.forEach( client => client.send(JSON.stringify(msg)));
}

//Set app parameters and attributes
app.use(cors());
app.use(bodyParser.json({limit: process.env.APP_JSON_PARSER_LIMIT}));
app.use(bodyParser.urlencoded({ extended: true, limit: process.env.APP_URL_ENCODER_LIMIT}));

// Load models and setup DB, DB is set up auto when tables are not existing!
db.sequelize.sync();

//adding winston as logger
const logger = new winston.createLogger({
    transports: [
        new winston.transports.File({
            level: 'info',
            filename: './logs/all-logs.log',
            handleExceptions: true,
            json: true,
            maxsize: 5242880, //5MB
            maxFiles: 5,
            colorize: false
        })
    ],
    exitOnError: false
});
winston.add(logger);

module.exports.logger = logger;

logger.stream = {
    write: function(message, encoding){
        logger.info(message);
    }
};

// adding morgan to log HTTP requests
app.use(morgan('combined', { stream: logger.stream }));

// Include routes which are served
require('./app/routes/index')(app);

//Start listening for requests
app.listen(process.env.APP_PORT, () => logger.info(`Example app listening on port ${process.env.APP_PORT}!`));
app.get('/', (req, res) => res.send('This is the Rest-API for the Lanport-Intranet, here ist nothing for you as a browser!'));