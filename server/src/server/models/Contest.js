//'use strict';


module.exports = (sequelize, DataTypes) => {
    const Contests = sequelize.define('Contests', {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
        },

        creator_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            onDelete: 'CASCADE',
            references: {
                model: 'Users-New',
                key: 'id'
            }
        },

        type: {
            type: DataTypes.ENUM('Name', 'Tagline', 'Logo'),
            allowNull: true
        },

        name: {
            type: DataTypes.STRING,
            allowNull: false
        },

        prize_pool: {
            type: DataTypes.DECIMAL(10,2),
            allowNull: false
        },

        type_of_title: {
            type: DataTypes.STRING,
            allowNull: true
        },
        industry: {
            type: DataTypes.STRING,
            allowNull: false
        },
        venture_name: {
            type: DataTypes.STRING,
            allowNull: true
        },
        type_of_work: {
            type: DataTypes.STRING,
            allowNull: false
        },
        target_customer: {
            type: DataTypes.STRING,
            allowNull: false
        },
        preferences: {
            type: DataTypes.STRING,
            allowNull: true
        },
        file: {
            type: DataTypes.STRING,
            allowNull: true
        },

        is_active: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },

        completed: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },

        days_passed: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0
        },

        description: {
            type: DataTypes.STRING,
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
        },

    },
{
            timestamps: false
        }
    );

    Contests.associate = function (models) {
        Contests.hasMany(models.Suggestions,  { foreignKey: 'contest_id', targetKey: 'id' });
        Contests.hasMany(models.ContestParticipants, {as: 'contest', foreignKey: 'contest_id', targetKey: 'id' });

    };

    // Contests.associate = function (models) {
    // };
    //
    // Contests.associate = function (models) {
    //     Contests.belongsTo(models.Users, {foreignKey: 'creator_id', sourceKey: 'id'});
    // };

    return Contests;
};
