const Sequelize = require("sequelize");
const db = require("../../config/database");
const bcrypt = require('bcrypt')

const User = db.define('user', {
    username: {
        field: 'user_username',
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
    },
    password: {
        field: 'user_password',
        type: Sequelize.DataTypes.STRING,
        allowNull: true
    }
}, {
    instanceMethods: {
        generateHash(password) {
            return bcrypt.hash(password, bcrypt.genSaltSync(10));
        },
        validPassword(password) {
            return bcrypt.compare(password, this.password);
        }
    }
});
module.exports = User;
