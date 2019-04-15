//'use strict';

module.exports = (sequelize , DataTypes) => {
    const Selects = sequelize.define('Selects', {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
        },

        name: {
            type: DataTypes.STRING,
            allowNull: false
        },

        contest_type: {
            type: DataTypes.STRING,
            allowNull: true
        }
    },
        {
            timestamps: false
        });

    return Selects;
};
