//'use strict';

module.exports = (sequelize, DataTypes) => {
    const ContestParticipants = sequelize.define('ContestParticipants', {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
        },

        participant_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            onDelete: 'CASCADE',
            references: {
                model: 'Users-New',
                key: 'id'
            }
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

        createdAt: {
            allowNull: false,
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW
        },

        updatedAt: {
            allowNull: false,
            type: DataTypes.DATE
        }
    });

    ContestParticipants.associate = function (models) {
        ContestParticipants.belongsTo(models.Users, {foreignKey: 'participant_id', sourceKey: 'id'});
        ContestParticipants.belongsTo(models.Contests,  {as: 'contest', foreignKey: 'contest_id', sourceKey: 'id'});

    // };
    //
    // Participants.associate = function (models) {
    };

    return ContestParticipants;
};
