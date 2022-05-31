const { log } = require('../logger');

// - - - - - - - - - - - - - - - - - -

function validateRequest(errors, route, res, logMsg) {
    if (!errors.isEmpty()) {
        log.info(logMsg, { route, errors });
        
        return res.status(404).json({ message: logMsg, errors });
    }
}

module.exports.validateRequest = validateRequest;

// = = = = = = = = = = = = = = = = = = = = = = = = = = = = = =

function capitalize(string) {
    return string.trim().toLowerCase().replace(/\w\S*/g, (w) => (w.replace(/^\w/, (c) => c.toUpperCase())));
}

module.exports.capitalize = capitalize;