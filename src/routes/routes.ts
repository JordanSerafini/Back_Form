import express from "express";
import Controller from "../controllers/controller";

// Use router of express
const router = express.Router();

router.get('/', (req, res) => {
    res.send('Hello, World!');
  });

router.post('/insertData', Controller.insertData);
router.get('/getData/:userId', Controller.getData);

// Export router
export default router