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

        file: {
            type: DataTypes.STRING,
            allowNull: true
        },

        status: {
            type: DataTypes.ENUM('rejected', 'winner', 'review'),
            defaultValue: 'review',
            allowNull: true
        },

        moderation_status: {
            type: DataTypes.ENUM('rejected', 'confirmed', 'review'),
            defaultValue: 'review',
            allowNull: true
        },

        created_at: {
            allowNull: false,
            defaultValue: DataTypes.NOW,
            type: DataTypes.DATE
        },

        updated_at: {
            allowNull: false,
            defaultValue: DataTypes.NOW,
            type: DataTypes.DATE
        }
    },      {
        timestamps: false
    });

    Suggestions.associate = function (models) {
        Suggestions.belongsTo(models.Contests, {foreignKey: 'contest_id', sourceKey: 'id'});
        Suggestions.belongsTo(models.Users, {foreignKey: 'user_id', sourceKey: 'id'});
    };

    return Suggestions;
};
