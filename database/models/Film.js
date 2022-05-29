const { DataTypes } = require('sequelize');

module.exports = sequelize => sequelize.define('film', {
    film_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    title: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    release_year: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    language_id: {
        type: DataTypes.SMALLINT,
        allowNull: false,
    },
    rental_duration: {
        type: DataTypes.SMALLINT,
        allowNull: false,
    },
    rental_rate: {
        type: DataTypes.DECIMAL(4,2),
        allowNull: false,
    },
    length: {
        type: DataTypes.SMALLINT,
        allowNull: false,
    },
    replacement_cost: {
        type: DataTypes.DECIMAL(4,2),
        allowNull: false,
    },
    rating: {
        type: DataTypes.ENUM(['G', 'PG', 'PG-13', 'R', 'NC-17']),
        allowNull: false,
    },
    special_features: {
        type: DataTypes.ARRAY(DataTypes.TEXT),
        allowNull: false,
    },
    fulltext: {
        type: DataTypes.TSVECTOR,
        allowNull: false,
    }
}, {
    timestamps: true,
    createdAt: false,
    updatedAt: 'last_update',

    // actually the tables should be named not like that
    freezeTableName: true,
});