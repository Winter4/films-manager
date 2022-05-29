const express = require('express');
const router = express.Router();

const filmsController = require('../controllers/films.controller');

// = = = = = = = = = = = = = = = = = = = =

router.get('/film/:title', filmsController.getFilm);

module.exports = router;