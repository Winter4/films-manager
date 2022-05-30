const { log } = require('../logger');

// - - - - - - - - - - - - - - - - - -

function validateRequest(errors, route, res, log) {
    if (!errors.isEmpty()) {
        log.info(log, { route, errors });
        
        return res.status(404).json({ message: log, errors });
    }
}

module.exports.validateRequest = validateRequest;

// = = = = = = = = = = = = = = = = = = = = = = = = = = = = = =

function capitalize(string) {
    return string.trim().toLowerCase().replace(/\w\S*/g, (w) => (w.replace(/^\w/, (c) => c.toUpperCase())));
}

module.exports.capitalize = capitalize;