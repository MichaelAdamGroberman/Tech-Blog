'use strict';
const {
  Model, DataTypes
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
      this.belongsTo(models.User, { foreignKey: 'CommentorId' })
      this.belongsTo(models.Comment, { foreignKey: 'PostId' })

    }
  };
  Comment.init({
    content: DataTypes.STRING,
    CommentorId: {
      type: DataTypes.INTEGER
    },
    PostId: {
      type: DataTypes.INTEGER
    }
  }, {
    sequelize,
    modelName: 'Comment',
  });
  return Comment;
};