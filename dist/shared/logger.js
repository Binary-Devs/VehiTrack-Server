"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.requestLog = void 0;
const requestLog = (req, res, next) => {
    console.log(`${req.method}\t${req.headers.origin}\t${req.url}`);
    console.log(`${req.method} ${req.path}`);
    next();
};
exports.requestLog = requestLog;
