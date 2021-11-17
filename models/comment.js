'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.User, { foreignKey: 'userId' })
      this.belongsTo(models.Comment, { foreignKey: 'postId' })

    }
  };
  Comment.init({
    content: DataTypes.STRING,
    userId: {
      type: DataTypes.INTEGER
    },
    postId: {
      type: DataTypes.INTEGER
    }
  }, {
    sequelize,
    modelName: 'Comment',
  });
  return Comment;
};