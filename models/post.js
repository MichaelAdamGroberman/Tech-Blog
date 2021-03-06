'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.User, { foreignKey: 'PosterId' })
      this.hasMany(models.Comment, { onDelete: 'cascade' }, { foreignKey: 'PostId' })

    }
  };
  Post.init({
    PosterId: {
      type: DataTypes.INTEGER
    },
    heading: DataTypes.STRING,
    content: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Post',
  });
  return Post;
};