"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var healthCheck = function (req, res, next) {
    return res.status(200).json({
        message: 'healthy'
    });
};
exports.default = { healthCheck: healthCheck };
