const Sequelize = require("sequelize")
const db = require("../../config/database")

const Comment = db.define('comment', {

    content: {
        field: 'comment_content',
        type: Sequelize.DataTypes.STRING,
        allowNull: true
    }
});

module.exports = Comment;
