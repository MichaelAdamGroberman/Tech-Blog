'use strict';
const bcrypt = require('bcrypt')
const {
  Model, DataTypes
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.Post, { onDelete: 'cascade' }, { foreignKey: 'PosterId' })
      this.hasMany(models.Comment, { onDelete: 'cascade' }, { foreignKey: 'CommentorId' })

    }
  };
  User.init({
    username: DataTypes.STRING,
    password: DataTypes.STRING
  },
    {
      hooks: {
        async beforeCreate(user) {
          user.password = await bcrypt.hash(user.password, 10);
          return user;
        },
        async beforeUpdate(user) {
          user.password = await bcrypt.hash(user.password, 10);
          return user;
        }
      },
      instanceMethods: {
        validatePassword: (password) => {
          return bcrypt.compareSync(password, this.password);
        }

      },

      sequelize,

      modelName: 'User'
    });
  return User;
};


