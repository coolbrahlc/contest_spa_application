'use strict';
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('BankAccounts', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            full_name: {
                type: Sequelize.STRING,
                allowNull: false
            },
            card_number: {
                type: Sequelize.STRING,
                allowNull: false
            },
            account: {
                type: Sequelize.DECIMAL(10,2),
                defaultValue: 0
            }

        });
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('BankAccounts');
    }
};
