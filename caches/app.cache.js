const LRU = require('lru-cache');

const cache = new LRU({
    // max count of cache records
    max: 500,

    // record's time to live in ms
    // 15s / 1000ms
    ttl: 15 * 1000, 
});

function getRecord(key) {
    return cache.get(key);
}

function setRecord(key, value) {
    cache.set(key, value);
}

module.exports = {
    get: getRecord,
    set: setRecord,
};