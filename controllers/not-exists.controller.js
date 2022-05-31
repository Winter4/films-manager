const { log } = require('../logger');

// = = = = = = = = = = = = = = = = = = = = = = = =

module.exports = async (req, res, next) => {
    try {
        log.info('Response for non-existing route with NOT FOUND');
        res.status(404).json({ message: 'Not Found' });
    } catch (e) {
        next(e);
    }       
};