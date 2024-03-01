import express from "express";
import Controller from "../controllers/controller";
import AuthController from "../controllers/authController";
import UserProController from "../controllers/userProController";
import supportController from "../controllers/supportController";
import formController from "../controllers/formController";
import customerEBPController from "../controllers/EBP_API/customerController";
import tableController from "../controllers/EBP_API/tableController";
import swapController from "../controllers/swapController";
import itemController from "../controllers/itemController";
import itemEBPController from "../controllers/EBP_API/itemController";
import cusctomerController from "../controllers/customerController";
import eventController from "../controllers/eventController";
import CreateTableController from "../controllers/EBP_API/createTableController";
import indexController from "../DB_SWAP/indexController";

import swapEbpController from "../DB_SWAP/swapControllerEbp";

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

// Route pour récupérer les articles
router.get('/articlePG', itemController.getAllitem)
//Route pour créer un article
router.post('/insertItem', itemController.insertItem)


// ##################################### clients / customers ##################################### //
// Route pour récupérer les clients
router.get('/customerPG', cusctomerController.getAllcustomer)
//Route pour insérer les coordonnées
router.post('/insertCoordinate', cusctomerController.insertCoordinate)

// Route Formulaire satisfaction
router.post('/insertData', Controller.insertData);
router.post('/sendForm', supportController.sendForm);

// Route pour récupérer les Events
router.get('/event', eventController.getAllevent)
router.post('/insertEvent', eventController.insertEvent)
router.delete('/deleteEvent/:id', eventController.deleteEvent)


// Route pour vérifier le token
router.get('/validateToken', formController.validateToken);



// EBP API LOCAL
router.get('/getAllTables', tableController.getAllTables)
router.get('/getAllCustomer', customerEBPController.getAllCustomer);
router.get('/item', itemEBPController.getAllItem);
router.get('/schedule-event', tableController.getScheduleEvent)

router.get('/createTable', CreateTableController.createTableWithColumns)
router.get('/test', indexController.listTablesAndSchemas)


// Route transfert de données MSSQL vers PGSQL
router.get('/swapItem', swapController.fetchAndInsertItem)
router.get('/swapCustomer', swapController.fetchAndInsertCustomer)
router.get('/swapEvent', swapController.fetchAndInsertEvent)




// -------------------------------- EBP local Full-------------------------------- //

router.get('/listTablesAndSchemas', indexController.listTablesAndSchemas)
router.get('/TotalSwapMSQLtoPG', swapEbpController.migrateDatabase)
router.get('/getAndInsertItem', swapEbpController.getAndInsertItem)

export default router