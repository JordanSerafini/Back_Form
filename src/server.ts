import express from "express";
import router from "./routes/routes";
import dotenv from "dotenv";
import cors from 'cors';
import { pool } from './database/pool';
import { error } from "console";
import test from "node:test";


// Setting up environment variables
dotenv.config();

// Create express application
const app = express();

const corsOptions = {
  origin: "http://localhost:5173",
};

app.use(cors(corsOptions));

/* ---- Test Connection bdd ----
const testPool = async () => {
  try {
    const result = await pool.query('SELECT * FROM question');
    console.log(result.rows);
  } catch (error) {
    console.error('Erreur lors de la récupération des questions:', error);
  }
};
testPool();
*/

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