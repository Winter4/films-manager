const { param, validationResult } = require('express-validator');
const { validateRequest } = require('../utils/utils');

const { log } = require('../logger');
const filmService = require('../services/films.service');

// = = = = = = = = = = = = = = = = = = = = = = = =

module.exports.getFilm = [
    [
        param('title', 'Invalid film title').isString(),
		param('title', 'Invalid film title length').isLength({ min: 2, max: 255 }),
    ],
	(req, res, next) => {
		try {
			// validate incoming request
			validateRequest(validationResult(req), `/film/${req.params.title}`, res, 'Invalid film data');
			next();
		} catch (e) {
			next(e);
		}
	},
    async (req, res, next) => {
		try {
			// get film from cache\db
			const film = await filmService.get(req.params.title);

			log.info('Response with film json OK');
			res.json({ data: film });
		} catch (e) {
			next(e);
    	}       
	}
];