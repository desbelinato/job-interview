// deps
const express = require("express");
const bodyParser = require("body-parser");
const helmet = require("helmet");
// const expressValidator = require('express-validator')
//
const apiRoutesPath = require("path").join(__dirname, "routes/api");
const webRoutesPath = require("path").join(__dirname, "routes/web");
const baseApiVersion = "v1";

// set app features and configs
const app = express();
// init secure middleware
app.disable("x-powered-by");
app.use(helmet());
// get body in post requests
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// app.use(expressValidator())

// attach api routes
require("fs")
    .readdirSync(apiRoutesPath)
    .forEach(function (file) {
        const routes = require(`./routes/api/${file}`);
        if (routes?.name && routes?.router) {
            app.use(
                `/api/${routes.version || baseApiVersion}/${routes.name}`,
                routes.router
            );
        }
    });
// attach web routes
require("fs")
    .readdirSync(webRoutesPath)
    .forEach(function (file) {
        const routes = require(`./routes/web/${file}`);
        if (routes?.name && routes?.router) {
            app.use(`/${routes.name}`, routes.router);
        }
    });

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    res.status(404).json({
        message: "No such route exists",
    });
});

// error handler
app.use(function (err, req, res, next) {
    res.status(err.status || 500).json({
        message: "Error Message",
    });
});

module.exports = app;
