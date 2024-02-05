import express from "express";

// Use router of express
const router = express.Router();

router.get('/', ProjectsController.getAllProjects);

// Export router
export default router