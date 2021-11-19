require("dotenv").config();

if (!process.env.JAWSDB_URL) {
    module.exports = {
        development: {
            username: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
            host: 'localhost',
            port: 3306,
            dialect: 'mysql',
        },
        test: {
            username: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
            host: 'localhost',
            port: 3306,
            dialect: 'mysql',
        },
        production: {
            username: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
            host: 'localhost',
            port: 3306,
            dialect: 'mysql',
        }
    };
}

else {
    module.exports = {
        development: {
            use_env_variable: "JAWSDB_URL",
            dialect: "mysql"
        },
        test: {
            use_env_variable: "JAWSDB_URL",
            dialect: "mysql"
        },
        production: {
            use_env_variable: "JAWSDB_URL",
            dialect: "mysql"
        }
    };
}