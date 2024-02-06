import express from "express";
import router from "./routes/routes";
import dotenv from "dotenv";
import cors from 'cors';
import { pool } from './database/pool';
import { error } from "console";


// Setting up environment variables
dotenv.config();

// Create express application
const app = express();

const corsOptions = {
  origin: "http://localhost:5173",
};

app.use(cors(corsOptions));


// Setting the middleware to serve static files
app.use(express.static("public"));
app.use(express.static("node_modules"));


// Setting the middleware to manage POST data
// Middleware is a function that runs between the request and the response
app.use(express.urlencoded({ extended: false }));
app.use(express.json());


// CORS


// Routes settings
app.use("/", router);

// Start the server
app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});