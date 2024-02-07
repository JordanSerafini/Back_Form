import express from "express";
import Controller from "../controllers/controller";
import AuthController from "../controllers/authController";
import UserProController from "../controllers/userProController";
import supportController from "../controllers/supportController";
import formController from "../controllers/formController";

import isToken from "../middleware/isToken";
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

router.post('/sendForm', supportController.sendForm);

//router.get('/form-satisfaction', isToken, formController.formSatisfaction); 
router.get('/validateToken', formController.validateToken);

// Export router
export default router