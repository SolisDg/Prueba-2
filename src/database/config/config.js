
require('dotenv').config();

module.exports= {
    development: {
        username: process.env.DB_USER || 'root',
        password: process.env.DB_PASSWORD || 'Atun.Polanco4',
        database: process.env.DB_NAME || 'prettythermo_db',
        host: process.env.DB_HOST || 'localhost',
        port: process.env.DB_PORT || 3306,
        dialect: 'mysql',
        logging: false, 
        timezone: '-06:00'
    },
    test: {
        username: process.env.DB_USER || 'root',
        password: process.env.DB_PASSWORD || 'Atun.Polanco4',
        database: 'prettythermo_test',
        host: 'localhost',
        dialect: 'mysql'
    },
    production: {
        username: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        host: process.env.DB_HOST,
        dialect: 'mysql',
        logging: false
    }
};