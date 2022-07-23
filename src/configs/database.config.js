const { DB_TYPE, DB_HOST, DB_NAME, DB_USER, DB_PASS, DB_PORT } = process.env;

module.exports = {
    development: {
        username: DB_USER,
        password: DB_PASS,
        database: DB_NAME,
        host: DB_HOST,
        port: DB_PORT,
        dialect: DB_TYPE,
        dialectOptions: {
            bigNumberStrings: true,
        },
    },
    test: {
        username: process.env.CI_DB_USERNAME,
        password: process.env.CI_DB_PASSWORD,
        database: process.env.CI_DB_NAME,
        host: DB_HOST,
        port: DB_PORT,
        dialect: DB_TYPE,
        dialectOptions: {
            bigNumberStrings: true,
        },
    },
    production: {
        username: process.env.CI_DB_USERNAME,
        password: process.env.CI_DB_PASSWORD,
        database: process.env.CI_DB_NAME,
        host: DB_HOST,
        port: DB_PORT,
        dialect: DB_TYPE,
        dialectOptions: {
            bigNumberStrings: true,
            // ssl: {
            //     ca: fs.readFileSync(__dirname + "/mysql-ca-main.crt"),
            // },
        },
    },
};
