"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var express_1 = __importDefault(require("express"));
var health_1 = __importDefault(require("../controllers/health"));
var router = express_1.default.Router();
router.get('/', health_1.default.healthCheck);
module.exports = router;
