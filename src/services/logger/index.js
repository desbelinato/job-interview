var winston = require("winston");
require("winston-daily-rotate-file");
const loggerConfig = require("../../configs/logger.config.json");
const { consoleFormat, fileFormat } = require("./formats");

const fileTtransport = new winston.transports.DailyRotateFile({
  filename: loggerConfig.filename,
  datePattern: loggerConfig.datePattern,
  maxSize: loggerConfig.maxSize,
  maxFiles: loggerConfig.maxFiles,
  format: fileFormat,
});

const consoleTransport = new winston.transports.Console({
  format: consoleFormat,
});

const logger = winston.createLogger({
  level: loggerConfig.level,
  // defaultMeta: { service: "user-service" },
  transports: [fileTtransport, consoleTransport],
});

module.exports = logger;
