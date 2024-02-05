import express from "express";
import router from "./src/routes/routes";
import dotenv from "dotenv";

// Setting up environment variables
dotenv.config();

// Create express application
const app = express();



// Setting the middleware to serve static files
app.use(express.static("public"));
app.use(express.static("node_modules"));


// Setting the middleware to manage POST data
// Middleware is a function that runs between the request and the response
app.use(express.urlencoded({ extended: false }));
app.use(express.json());


// Routes settings
app.use("/", router);

// Start the server
app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});