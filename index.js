// load configs
require("dotenv").config({ path: `${process.cwd()}/.env` });
const logger = require("./src/services/logger");
// web server app
const app = require("./src/app.js");
// sequelize
// const sequelize = require("./src/services/sequelize");
const { sequelize } = require("./src/db/models");
const { API_PORT } = process.env;

async function start() {
    // sequelize: check connection
    await sequelize.authenticate();
    // run web application
    return new Promise((resolve, reject) => {
        app.listen(API_PORT, () => {
            logger.info(`app listening on port ${API_PORT}`);
            resolve();
        });
    });
}

start()
    .then(() => logger.info("app run"))
    .catch((error) => logger.error("Unexpected error:", error));
