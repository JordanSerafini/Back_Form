import express from "express";
import Controller from "../controllers/controller";

// Use router of express
const router = express.Router();

router.get('/', Controller.insertUser);

// Export router
export default router