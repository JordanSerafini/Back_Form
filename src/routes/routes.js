"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var controller_1 = require("../controllers/controller");
// Use router of express
var router = express_1.default.Router();
router.get('/', function (req, res) {
    res.send('Hello, World!');
});
router.post('/insertData', controller_1.default.insertData);
// Export router
exports.default = router;
