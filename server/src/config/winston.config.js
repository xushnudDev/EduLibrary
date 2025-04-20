import winston from 'winston';
import fs from 'fs';

if (!fs.existsSync('logs')) {
    fs.mkdirSync('logs');
}

const filterOnly = (level) => 
    winston.format((info) => {
        if (info.level === level) {
            return info;
        }
    })();

const logger = winston.createLogger({
    format: winston.format.combine(
        winston.format.timestamp({ format: "YYYY-MM-DD HH:mm" }),
        winston.format.json()
      ),
    transports: [
        new winston.transports.Console({level: 'error'}),
        new winston.transports.File({
            filename: "logs/error.log",
            level: "error",
            format: filterOnly("error")
        }),
        new winston.transports.File({
            filename: "logs/info.log",
            level: "info",
            format: filterOnly("info")
        }),
        new winston.transports.File({
            filename: "logs/combined.log",
            level: "info",
            format: filterOnly("info")
        }),
        new winston.transports.File({
            filename: "logs/warn.log",
            level: "warn",
            format: filterOnly("warn")
        })
    ]  
});    

export default logger;