const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../../../.env') });

const filmService = require('../../../services/films.service');

const db = require('../../../database/sequelize');
const redis = require('../../../caches/redis.cache').client;

// = = = = = = = = = = = = = = = = = = = = = = = = = = = = =

// don't think that's the right way to solve the dependency,
// but for now it works and that's enough
beforeAll(async () => {
    await db.authenticate();
    await redis.connect();
});

describe('Films service:', () => {

    test('should return json data for valid request for existing film', async () => {
        const result = await filmService.get('Alabama Devil');

        expect(result).toBeInstanceOf(Object);
        expect(result).not.toBeFalsy();
        expect(result.title).toEqual('Alabama Devil');
    });

    test('should return null json for valid request for NOT existing film', async () => {
        const result = await filmService.get('Some not-existing film');

        expect(result).toBeNull();
    });
});

afterAll(async () => {
    await db.close();
    await redis.disconnect();
});