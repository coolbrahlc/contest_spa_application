'use strict';
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('Suggestions', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },

            contest_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                onDelete: 'CASCADE',
                references: {
                    model: 'Contests',
                    key: 'id'
                }
            },

            user_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                onDelete: 'CASCADE',
                references: {
                    model: 'Users',
                    key: 'id'
                }
            },

            file: {
                type: Sequelize.STRING,
                allowNull: true
            },

            answer: {
                type: Sequelize.STRING,
                allowNull: false
            },

            status: {
                type: Sequelize.ENUM('rejected', 'winner', 'review'),
                defaultValue: 'review',
                allowNull: true
            },

            moderation_status: {
                type: Sequelize.ENUM('rejected', 'confirmed', 'review'),
                defaultValue: 'review',
                allowNull: true
            },

            created_at: {
                allowNull: false,
                type: Sequelize.DATE,
                defaultValue: Sequelize.NOW
            },

            updated_at: {
                allowNull: false,
                defaultValue: Sequelize.NOW,
                type: Sequelize.DATE
            }
        });
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('Suggestions');
    }
};
