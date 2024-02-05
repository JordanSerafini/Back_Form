"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const routes_1 = __importDefault(require("./src/routes/routes"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
// Setting up environment variables
dotenv_1.default.config();
// Create express application
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
// Setting the middleware to serve static files
app.use(express_1.default.static("public"));
app.use(express_1.default.static("node_modules"));
// Setting the middleware to manage POST data
// Middleware is a function that runs between the request and the response
app.use(express_1.default.urlencoded({ extended: false }));
app.use(express_1.default.json());
// CORS
// Routes settings
app.use("/", routes_1.default);
// Start the server
app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});
