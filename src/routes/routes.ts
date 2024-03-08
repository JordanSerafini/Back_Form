import express from "express";
import Controller from "../controllers/appController/controller";
import AuthController from "../controllers/Support/authController";
import UserProController from "../controllers/appController/userProController";
import supportController from "../controllers/Support/supportController";
import customerEBPController from "../controllers/EBP_API/customerController";
import tableController from "../controllers/EBP_API/tableController";
import swapController from "../controllers/appController/swapController";
import itemController from "../controllers/appController/itemController";
import itemEBPController from "../controllers/EBP_API/itemController";
import cusctomerController from "../controllers/appController/customerController";
import eventController from "../controllers/appController/eventController";
import CreateTableController from "../controllers/EBP_API/createTableController";
import indexController from "../DB_SWAP/indexController";
import fullSwapController from "../DB_SWAP/fullSwapController";

import formController from "../controllers/FORM/formController";
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

// Route pour récupérer les Events
router.get('/event', eventController.getAllevent)
router.post('/insertEvent', eventController.insertEvent)
router.delete('/deleteEvent/:id', eventController.deleteEvent)



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
router.get('/getAndInsertStockItem', swapEbpController.getAndInsertStockItem)
router.get('/getAndInsertCustomer', swapEbpController.getAndInsertCustomer)
router.get('/getAndInsertSupplier', swapEbpController.getAndInsertSupplier)
router.get('/getAndInsertSupplierFamily', swapEbpController.getAndInsertSupplierFamily)
router.get('/getAndInsertCustomerFamily', swapEbpController.getAndInsertCustomerFamily)
router.get('/getAndInsertAddress', swapEbpController.getAndInsertAddress)
router.get('/getAndInsertStockMovement', swapEbpController.getAndInsertStockMovement)
router.get('/getAndInsertCustomerProduct', swapEbpController.getAndInsertCustomerProduct)
router.get('/getAndInsertScheduleEvent', swapEbpController.getAndInsertScheduleEvent)
router.get('/getAndInsertItemFamily', swapEbpController.getAndInsertItemFamily)

// ---------------------------------------------------------------- //
router.get('/createAllTables', fullSwapController.createAllTables)
router.get('/insertAll', fullSwapController.insertAll)
router.get('/truncateAllTables', fullSwapController.truncateAllTables)
router.get('/DeleteAllTables', fullSwapController.DeleteAllTables)

// Route pour récupérer les Clients
router.get('/customerNew', fullSwapController.getAllCustomer)
router.get('/itemNew', fullSwapController.getAllItem)
router.post('/editItemStock', fullSwapController.editItemStock)
router.delete('/deleteItem', fullSwapController.deleteItem)
router.get('/getitembycaption', fullSwapController.getItemByCaption)

// Formulaire de satisfaction
router.post('/createFormulaire', formController.createFormulaire)
router.post('/sendForm', formController.sendForm);
router.get('/validateTokenHeader', formController.validateTokenHeader) // Header
router.get('/invalidateToken', AuthController.invalidateToken) 
router.get('/verifyToken', AuthController.verifyTokenParams) // Params URL
router.get('/verifyTokenHeader', AuthController.verifyTokenHeader) // Header

export default router