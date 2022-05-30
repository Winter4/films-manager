const { param, validationResult } = require('express-validator');
const { validateRequest } = require('../utils/utils');

const filmService = require('../services/films.service');

// = = = = = = = = = = = = = = = = = = = = = = = =

module.exports.getFilm = [
    [
        param('title', 'Invalid film title').isString({ length: {min: 1} }),
    ],
    async (req, res, next) => {
		try {
			// validate incoming request
			validateRequest(validationResult(req), `/film/${req.params.title}`, res, 'Invalid film data');

			log.info('Response with film json OK');
			const film = await filmService.get(req.params.title);
			res.json({ data: film });
		} catch (e) {
			next(e);
    	}       
	}
];