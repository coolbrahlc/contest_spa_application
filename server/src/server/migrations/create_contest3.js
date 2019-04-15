'use strict';
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('Contests', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },

            creator_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                onDelete: 'CASCADE',
                references: {
                    model: 'Users',
                    key: 'id'
                }
            },
            order_id: {
                type: Sequelize.STRING,
                allowNull: true
            },

            end_date: {
                allowNull: true,
                type: Sequelize.DATE,
            },

            type: {
                type: Sequelize.ENUM('Name', 'Tagline', 'Logo'),
                allowNull: true
            },

            name: {
                type: Sequelize.STRING,
                allowNull: false
            },

            prize_pool: {
                type: Sequelize.DECIMAL(10,2),
                allowNull: false
            },

            type_of_title: {
                type: Sequelize.STRING,
                allowNull: true
            },
            industry: {
                type: Sequelize.STRING,
                allowNull: false
            },
            venture_name: {
                type: Sequelize.STRING,
                allowNull: true
            },
            type_of_work: {
                type: Sequelize.STRING,
                allowNull: false
            },
            target_customer: {
                type: Sequelize.STRING,
                allowNull: false
            },
            preferences: {
                type: Sequelize.STRING,
                allowNull: true
            },
            file: {
                type: Sequelize.STRING,
                allowNull: true
            },

            is_active: {
                type: Sequelize.BOOLEAN,
                defaultValue: false
            },

            completed: {
                type: Sequelize.BOOLEAN,
                defaultValue: false
            },

            days_passed: {
                type: Sequelize.INTEGER,
                allowNull: false,
                defaultValue: 0
            },

            description: {
                type: Sequelize.STRING,
                allowNull: true
            },

            created_at: {
                allowNull: false,
                type: Sequelize.DATE,
                defaultValue: Sequelize.NOW
            },

            updated_at: {
                allowNull: false,
                type: Sequelize.DATE,
                defaultValue: Sequelize.NOW

            }
        });
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('Contest');
    }
};
