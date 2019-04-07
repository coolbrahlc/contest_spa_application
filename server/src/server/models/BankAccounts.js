//'use strict';

module.exports = (sequelize , DataTypes) => {
    const BankAccounts = sequelize.define('BankAccounts', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: DataTypes.INTEGER
            },
            full_name: {
                type: DataTypes.STRING,
                allowNull: false
            },
            card_number: {
                type: DataTypes.STRING,
                allowNull: false
            },
            account: {
                type: DataTypes.DECIMAL(10,2),
                defaultValue: 0
            }

        },
        {
            timestamps: false
        }
    );

    return BankAccounts;
};
