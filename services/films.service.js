const Film = require('../database/sequelize').models.film;
const { log } = require('../logger');
const { capitalize } = require('../utils/utils');
const nodeCache = require('../caches/app.cache');

async function getFilm(title) {
    title = capitalize(title);

    let result = null;

    // check the app cache 
    const appCached = nodeCache.get(title);
    if (appCached) result = appCached;
    else result = await Film.findOne({ where: {title} });

    // cache the query
    nodeCache.set(title, result);

    return result;
}

module.exports = {
    get: getFilm,
};