import express from "express";
import Controller from "../controllers/controller";
import AuthController from "../controllers/authController";
import UserProController from "../controllers/userProController";

import isAuthMw from "../middleware/isAuth";

// Use router of express
const router = express.Router();

router.get('/', (req, res) => {
    res.send('Hello, World!');
  });

router.post('/login', AuthController.loginWithEmailPassword)


router.post('/createUser', UserProController.createUser)
router.get('/getUtilisateurInfo', isAuthMw.isAuth , UserProController.getUtilisateurInfo);


router.post('/insertData', Controller.insertData);
router.get('/getData/:id', Controller.getData);

// Export router
export default router