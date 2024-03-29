"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const controller_1 = __importDefault(require("../controllers/controller"));
// Use router of express
const router = express_1.default.Router();
router.get('/', (req, res) => {
    res.send('Hello, World!');
});
router.post('/insertData', controller_1.default.insertData);
// Export router
exports.default = router;
//# sourceMappingURL=routes.js.map