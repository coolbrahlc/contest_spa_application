'use strict';
module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('Users', {
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
			email: {
				type: Sequelize.STRING,
				allowNull: false,
				unique: true,
				validate: {
					isEmail: true
				}
			},
			password: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			profile_picture: {
				type: Sequelize.STRING,
				allowNull: true,
			},

            account: {
                type: Sequelize.DECIMAL(10,2),
                defaultValue: 0
            },

			role: {
				type: Sequelize.INTEGER,
				allowNull: false,
				defaultValue: 0,
				validate: {
					allowNull: false,
					max: 2,
					min: 0,
				}
			},

			token: {
				type: DataTypes.STRING,
				allowNull: true,
				unique: true,
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
		return queryInterface.dropTable('Users');
	}
};
