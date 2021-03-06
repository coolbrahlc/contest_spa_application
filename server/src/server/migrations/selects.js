'use strict';
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('Selects', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },

            name: {
                type: Sequelize.STRING,
                allowNull: false
            },

            contest_type: {
                type: Sequelize.STRING,
                allowNull: true
            }
        });

    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('Selects');
    }
};
