const Sequelize = require("sequelize")
const db = require("../../config/database")

const Post = db.define('post', {
    Heading: {
        field: 'post_heading',
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
    },
    content: {
        field: 'post_content',
        type: Sequelize.DataTypes.STRING,
        allowNull: true
    }
})

module.exports = Post;
