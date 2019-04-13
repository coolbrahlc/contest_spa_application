// 'use strict';
// module.exports = {
//     up: (queryInterface, Sequelize) => {
//         return queryInterface.addColumn('User', 'account', {
//             type: Sequelize.DECIMAL(10,2),
//             defaultValue: 0
//         });
//
//     },
//     down: (queryInterface, Sequelize) => {
//         return queryInterface.dropTable('User-New');
//     }
// };



// 'use strict';
// module.exports = {
//     up: (queryInterface, DataTypes) => {
//         return queryInterface.changeColumn('Users', 'role', {
//             type: DataTypes.ENUM('customer', 'creative'),
//             defaultValue: 'customer',
//             allowNull: false,
//         });
//     },
//
//     down: (queryInterface, DataTypes) => {
//         return queryInterface.dropTable('User');
//     }
// };


'use strict';
module.exports = {
    up: (queryInterface, DataTypes) => {
        return queryInterface.addColumn('Contests', 'order_id', {
            allowNull: true,
            type: DataTypes.STRING,
        });
    },

    down: (queryInterface, DataTypes) => {
        return queryInterface.dropTable('User');
    }
};
