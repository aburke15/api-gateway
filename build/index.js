"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var http_1 = __importDefault(require("http"));
var express_1 = __importDefault(require("express"));
var body_parser_1 = __importDefault(require("body-parser"));
var logging_1 = __importDefault(require("./config/logging"));
var config_1 = __importDefault(require("./config/config"));
var health_1 = __importDefault(require("./routes/health"));
var NAMESPACE = 'Server';
var router = express_1.default();
router.use(function (req, res, next) {
    /** Log the req */
    logging_1.default.info(NAMESPACE, "METHOD: [" + req.method + "] - URL: [" + req.url + "] - IP: [" + req.socket.remoteAddress + "]");
    res.on('finish', function () {
        /** Log the res */
        logging_1.default.info(NAMESPACE, "METHOD: [" + req.method + "] - URL: [" + req.url + "] - STATUS: [" + res.statusCode + "] - IP: [" + req.socket.remoteAddress + "]");
    });
    next();
});
router.use(body_parser_1.default.urlencoded({ extended: true }));
router.use(body_parser_1.default.json());
router.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    if (req.method == 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }
    next();
});
router.use('/api/check', health_1.default);
router.use(function (req, res, next) {
    var error = new Error('Not found');
    res.status(404).json({
        message: error.message
    });
});
var httpServer = http_1.default.createServer(router);
httpServer.listen(config_1.default.server.port, function () { return logging_1.default.info(NAMESPACE, "Server is running " + config_1.default.server.hostname + ":" + config_1.default.server.port); });
