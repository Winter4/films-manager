const express = require('express');
require('dotenv').config();

const { log } = require('./logger');
const app = express();

const db = require('./database/sequelize');

// = = = = = = = = = = = = = = = = =

// logging every incoming request
app.use((req, res, next) => {
    log.info('New Request', { method: req.method, url: req.url, query: req.query, body: req.body });
    next();
});

// - - - - - 

// film endpoints
app.use(require('./routes/films.route'));

// - - - - -

// handling errors
app.use(
    // log
    (err, req, res, next) => {
        log.error(err.message, { route: req.url, err });
        next(err);
    },
    // response
    (err, req, res, next) => {
        res.status(500).json({ message: 'Something went wrong' });
    }
);

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
            log.info('Server started at ' + process.env.SERVER_PORT);
        });
    } catch (e) {
        console.error(e);
    }
}

start();