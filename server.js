const express = require('express');
require('dotenv').config();

const { log } = require('./logger');
const app = express();

const db = require('./database/sequelize');

// = = = = = = = = = = = = = = = = =

async function start() {
    try {
        // connect to DB
        await db.authenticate();
        console.log('Connected to DB');
        log.info('Connected to DB');

        // start the server
        app.listen(process.env.SERVER_PORT, () => {
            console.log('Server started at', process.env.SERVER_PORT);
            log.info('Server started at' + process.env.SERVER_PORT);
        });
    } catch (e) {
        console.error(e);
    }
}

start();