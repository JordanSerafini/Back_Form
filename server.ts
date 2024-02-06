import express from "express";
import router from "./src/routes/routes";
import dotenv from "dotenv";
import cors from 'cors';
import { pool } from './src/database/pool';


// Setting up environment variables
dotenv.config();

// Create express application
const app = express();
app.use(cors());

  
  // Fonction pour tester la connexion à la base de données
  async function testDatabaseConnection() {
    try {
      const test = await pool.query(`SELECT tablename FROM pg_catalog.pg_tables WHERE schemaname != 'pg_catalog' AND schemaname != 'information_schema'`); 
      console.log(test);
    } catch (err) {
      console.error('Échec de la connexion à la base de données:', err.message);
      process.exit(1); // Arrêter l'application en cas d'échec de la connexion
    }
  }
  
  // Appeler la fonction de test de connexion
  testDatabaseConnection();


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