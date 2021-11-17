'use strict';
const bcrypt = require('bcrypt')
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    validate(pass) {
      return bcrypt.compareSync(pass, this.password)
    }
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.Post, { foreignKey: 'userId' })
      this.hasMany(models.Comment, { foreignKey: 'userId' })

    }
  };
  User.init({
    username: DataTypes.STRING,
    password: DataTypes.STRING
  }, {
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
    sequelize,

    modelName: 'User'
  });
  return User;
};

