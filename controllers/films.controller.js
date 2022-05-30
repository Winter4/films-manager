const { param, validationResult } = require('express-validator');
const { validateRequest } = require('../utils/utils');

const filmService = require('../services/films.service');

// = = = = = = = = = = = = = = = = = = = = = = = =

module.exports.getFilm = [
    [
        param('title', 'Invalid film title').isString({ length: {min: 1} }),
    ],
	(req, res, next) => {
		try {
			// validate incoming request
			validateRequest(validationResult(req), `/film/${req.params.title}`, res, 'Invalid film data');
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