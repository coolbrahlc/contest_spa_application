//'use strict';


module.exports = (sequelize , DataTypes) => {
  const Users = sequelize.define('Users', {
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
        email: {
          type: DataTypes.STRING,
          allowNull: false,
          unique: true,
          validate: {
            isEmail: true
          }
        },

        token: {
          type: DataTypes.STRING,
          allowNull: true,
          unique: true,
        },

        password: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        profile_picture: {
          type: DataTypes.STRING,
          allowNull: true,
        },

        account: {
          type: DataTypes.DECIMAL(10,2),
          defaultValue: 0
        },

        role: {
          type: DataTypes.INTEGER,
          allowNull: false,
          defaultValue: 0,
          validate: {
            max: 2,
            min: 0,
          }
        },

        created_at: {
          allowNull: false,
          type: DataTypes.DATE,
          defaultValue: DataTypes.NOW
        },
        updated_at: {
          allowNull: false,
          type: DataTypes.DATE
        }
      },
      {
        timestamps: false
      }

  );

  Users.associate = function (models) {
      Users.hasMany(models.Contests, { foreignKey: 'creator_id', targetKey: 'id' });
      Users.hasMany(models.Suggestions, { foreignKey: 'user_id', targetKey: 'id' });
  };

  return Users;
};
