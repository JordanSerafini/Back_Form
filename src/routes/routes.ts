import express from "express";
import Controller from "../controllers/controller";
import AuthController from "../controllers/authController";
import UserProController from "../controllers/userProController";
import supportController from "../controllers/supportController";
import formController from "../controllers/formController";
import customerController from "../controllers/EBP_API/customerController";
import tableController from "../controllers/EBP_API/tableController";
import swapController from "../controllers/swapController";
import itemController from "../controllers/itemController";

import isToken from "../middleware/isToken";
import isAuthMw from "../middleware/isAuth";

// Use router of express
const router = express.Router();

router.get('/', (req, res) => {
    res.send('Hello, World!');
  });


// Route login
router.post('/login', AuthController.loginWithEmailPassword)

// Route créer utilisateur de l'app
router.post('/createUser', UserProController.createUser)

// Route pour récupérer les info d'un utilisateur
router.get('/getUtilisateurInfo', isAuthMw.isAuth , UserProController.getUtilisateurInfo);


router.get('/getData/:id', Controller.getData);

router.get('/itemLocal', itemController.getAllitem)

router.post('/insertData', Controller.insertData);
router.post('/sendForm', supportController.sendForm);

//router.get('/form-satisfaction', isToken, formController.formSatisfaction); 
router.get('/validateToken', formController.validateToken);// Export router



// EBP API LOCAL
router.get('/tables', tableController.getAllTables)
router.get('/getAllCustomer', customerController.getAllCustomer);
router.get('/item', itemController.getAllitem);

router.get('/swapItem', swapController.fetchAndInsertItem)
router.get('/swapCustomer', swapController.fetchAndInsertCustomer)



router.get('/test', tableController.test)

export default router