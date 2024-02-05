import express from "express";
import Controller from "../controllers/controller";

// Use router of express
const router = express.Router();

router.post('/insertData', Controller.insertData);

// Export router
export default router