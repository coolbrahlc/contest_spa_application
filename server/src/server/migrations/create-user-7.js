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
			// age: {
			// 	type: Sequelize.BIGINT,
			// 	allowNull: false,
			// 	isAdult(value) {
			// 		let date = moment()
			// 			.subtract(18, 'years')
			// 			.unix();
			// 		date = moment(date).diff(value);
			// 		if (date <= 0) {
			// 			throw  new Error('You must be older then 18 years');
			// 		}
			// 	}
			// },
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

			created_at: {
				allowNull: false,
				type: Sequelize.DATE,
				defaultValue: Sequelize.NOW
			},
			updated_at: {
				allowNull: false,
				type: Sequelize.DATE
			}
		});
	},
	down: (queryInterface, Sequelize) => {
		return queryInterface.dropTable('Users');
	}
};
