//'use strict';

module.exports = (sequelize , DataTypes) => {
    const Suggestions = sequelize.define('Suggestions', {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
        },

        contest_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            onDelete: 'CASCADE',
            references: {
                model: 'Contest',
                key: 'id'
            }
        },

        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            onDelete: 'CASCADE',
            references: {
                model: 'Users-New',
                key: 'id'
            }
        },

        answer: {
            type: DataTypes.STRING,
            allowNull: false
        },

        status: {              // TO DO
            type: DataTypes.ENUM('rejected', 'winner', 'review'),
            defaultValue: 'review',
            allowNull: true
        },

        created_at: {
            allowNull: false,
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW
        },

        updated_at: {
            allowNull: false,
            type: DataTypes.DATE
        }
    },      {
        timestamps: false
    });

    Suggestions.associate = function (models) {
        Suggestions.belongsTo(models.Users, {foreignKey: 'user_id', sourceKey: 'id'});
    };
    Suggestions.associate = function (models) {
        Suggestions.belongsTo(models.Contests, {foreignKey: 'contest_id', sourceKey: 'id'});
    };

    return Suggestions;
};
