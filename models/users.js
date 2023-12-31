'use strict';
const { Model } = require('sequelize');

const { v1 } = require('uuid');

const uuid = () => {
  const tokens = v1().split('-');
  return tokens[2] + tokens[1] + tokens[0] + tokens[3] + tokens[4];
};

module.exports = (sequelize, DataTypes) => {
  class Users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.Posts, {
        sourceKey: 'userId',
        foreignKey: 'UserId',
      });

      this.hasMany(models.Comments, {
        sourceKey: 'userId',
        foreignKey: 'UserId',
      });

      this.hasMany(models.PostLikes, {
        sourceKey: 'userId',
        foreignKey: 'UserId',
      });
    }
  }
  Users.init(
    {
      userId: {
        type: DataTypes.UUID,
        defaultValue: () => uuid(),
        allowNull: false,
        primaryKey: true,
      },
      nickname: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      sequelize,
      modelName: 'Users',
    }
  );
  return Users;
};
