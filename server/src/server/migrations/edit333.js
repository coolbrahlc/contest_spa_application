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
    return queryInterface.addColumn('Suggestions', 'moderation_status', {
      type: DataTypes.ENUM('rejected', 'confirmed', 'review'),
      defaultValue: 'review',
      allowNull: true
    });
  },

    down: (queryInterface, DataTypes) => {
        return queryInterface.dropTable('Selects');
    }
};
