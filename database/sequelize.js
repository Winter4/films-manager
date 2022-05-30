const { Sequelize } = require('sequelize');
const { log } = require('../logger');

function createClient() {
    const host = process.env.DB_HOST;
    const username = process.env.DB_USER;
    const password = process.env.DB_PASSWORD;
    const database = process.env.DB_DATABASE;

    return new Sequelize(database, username, password, {
        host,
        dialect: 'postgres',
        
        logging: msg => log.info(msg),
    });
}

// create DB client
const db = createClient();

// array for defining models
// element of the array is a func that takes client instance
// as a parameter and creates a new client.models.modelName field
const modelDefiners = [
	require('./models/Film'),
];

// define all models according to their files
for (const definer of modelDefiners) {
	definer(db);
}

// associate models
/* const { user, repo } = db.models;
user.hasMany(repo, { foreignKey: 'user_id' });
repo.belongsTo(user, { foreignKey: 'user_id' }); */

// exporting the DB client
module.exports = db;