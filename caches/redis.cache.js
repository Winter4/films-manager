const { createClient } = require('redis');
const { log } = require('../logger');

const host = process.env.REDIS_HOST;
const port = process.env.REDIS_PORT;
const url = `redis://${host}:${port}`;

// connect to localhost via default 6379 port
const client = createClient({
    url
});

client.on('connect', () => {
    console.log('Connecting to Redis..');
    log.info('Connecting to Redis..');
});
client.on('ready', () => {
    console.log('Connected to Redis');
    log.info('Connected to Redis');
});
client.on('error', (err) => { 
    console.log('Redis connection error:', err);
    log.error('Redis connection error', { err });
});

module.exports.client = client;

// = = = = = = = = = = = = = = = = = = = = = = =

async function setRecord(key, value) {
    try {
        await client.set(key, JSON.stringify(value), (err, res) => {
            if (err) throw err;
            log.info('Redis: record set', { source: 'redis' });
        });

        // set expire time 30 seconds
        await client.expire(key, 30);
    } catch (e) {
        throw e;
    }
}

async function getRecord(key) {
    try {
        const result = await client.get(key, (err, res) => {
            if (err) throw err;
            log.info('Redis: record got', { source: 'redis', value: res });
        });

        return JSON.parse(result);
    } catch (e) {
        throw e;
    }
}

module.exports.methods = {
    get: getRecord,
    set: setRecord,
};