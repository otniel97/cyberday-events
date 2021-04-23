require('dotenv').config();
module.exports = {
    development: {
        username: process.env.DATABASE_DEV_USERNAME,
        password: process.env.DATABASE_DEV_PASSWORD,
        database: process.env.DATABASE_DEV_NAME,
        host: process.env.DATABASE_DEV_HOST,
        dialect: process.env.DATABASE_DEV_DIALECT,
        omitNull: "true",
        logging: console.log
    },
    test: {
        username: process.env.DATABASE_DEV_USERNAME,
        password: process.env.DATABASE_DEV_PASSWORD,
        database: process.env.DATABASE_DEV_NAME,
        host: process.env.DATABASE_DEV_HOST,
        dialect: process.env.DATABASE_DEV_DIALECT,
        omitNull: "true",
        logging: console.log
    },
    production: {
        username: process.env.DATABASE_DEV_USERNAME,
        password: process.env.DATABASE_DEV_PASSWORD,
        database: process.env.DATABASE_DEV_NAME,
        host: process.env.DATABASE_DEV_HOST,
        dialect: process.env.DATABASE_DEV_DIALECT,
        omitNull: "true",
        logging: console.log
    }
}