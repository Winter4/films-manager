const Film = require('../database/sequelize').models.film;
const { capitalize } = require('../utils/utils');

const nodeCache = require('../caches/app.cache');
const redisCache = require('../caches/redis.cache').methods;

async function getFilm(title) {
    try {
        title = capitalize(title);

        let result = null;

        // check the app cache 
        const appCached = nodeCache.get(title);
        if (appCached) result = appCached;
        else {
            // check the redis cache
            const redisCached = await redisCache.get(title);
            if (redisCached) result = redisCached;
        }

        // otherway, quer to database
        if (!result) result = await Film.findOne({ where: {title} }); 

        // cache the query (anyway)
        nodeCache.set(title, result);
        await redisCache.set(title, result);

        return result;
    } catch (e) {
        throw e;
    }
}

module.exports = {
    get: getFilm,
};