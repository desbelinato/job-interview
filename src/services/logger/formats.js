var winston = require("winston");
require("winston-daily-rotate-file");

const consoleFormat = winston.format.combine(
  winston.format.colorize(),
  winston.format.timestamp(),
  //winston.format.align(),
  //winston.format.splat(),
  winston.format.metadata({
    fillExcept: ["message", "level", "timestamp", "label"],
  }),
  winston.format.printf((info) => {
    //const ts = info.timestamp.slice(0, 19).replace("T", " ");
    if (info.metadata) {
      const meta =
        Object.keys(info.metadata).length ||
        Object.getOwnPropertyNames(info.metadata).length
          ? JSON.stringify(info.metadata)
          : "";
      return `${info.level}: ${info.message} ${meta}`;
    } else {
      return `${info.level}: ${info.message}`;
    }
  })
);

const fileFormat = winston.format.combine(
  winston.format.timestamp(),
  //winston.format.align(),
  //winston.format.splat(),
  winston.format.metadata({
    fillExcept: ["message", "level", "timestamp", "label"],
  }),
  winston.format.printf((info) => {
    const ts = info.timestamp.slice(0, 19).replace("T", " ");
    if (info.metadata) {
      return `${ts} [${process.pid}] [${info.level}]: ${info.message} ${
        Object.keys(info.metadata).length ||
        Object.getOwnPropertyNames(info.metadata).length
          ? JSON.stringify(info.metadata)
          : ""
      }`;
    } else {
      return `${ts} [${process.pid}] [${info.level}]: ${info.message}`;
    }
  })
);

module.exports = {
  consoleFormat,
  fileFormat,
};
