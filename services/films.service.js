const Film = require('../database/sequelize').models.film;
const { log } = require('../logger');
const { capitalize } = require('../utils/utils');

async function getFilm(title) {
    title = capitalize(title);
    return await Film.findOne({ where: {title} });
}

module.exports = {
    get: getFilm,
};