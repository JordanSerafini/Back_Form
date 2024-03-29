// Importez uniquement ce dont vous avez besoin
import { executeQuery } from "../database/client/clientPGlocal"; // Client base de donnée PostgreSQL de destinat
import client from "../database/client/client"; // Client base de donnée Microsoft SQL Server de base
import {pool} from "../database/client/pool"; // Client base de donnée PostgreSQL de destination
import indexController from "./indexController";
import {
  executeScriptsOnPostgres,
  generatePostgresSchema,
} from "./functionEBP-2";

import {pgClient} from "../database/client/clientPGlocal"; 

interface TableAndColumns {
  tableName: string;
  columns: {
    COLUMN_NAME: string;
    DATA_TYPE: string;
    CHARACTER_MAXIMUM_LENGTH: number;
    IS_NULLABLE: string;
    COLUMN_DEFAULT: any;
  }[];
}

const fullSwapController = {
  // Récupérer les tables et leurs schémas depuis une BDD locale Microsoft SQL Server puis les créer dans une BDD PostgreSQL
  async createAllTables() {
    try {
      await client.connectDatabase();

      // Lister les tables et leurs schémas
      const tablesAndSchemas: TableAndColumns[] =
        await indexController.listTablesAndSchemas();

      for (const { tableName, columns } of tablesAndSchemas) {
        // Générer le script de création de table PostgreSQL
        const createTableScript = generatePostgresSchema(tableName, columns);

        // Exécuter le script de création de table PostgreSQL
        await executeScriptsOnPostgres([createTableScript]);
      }

      console.log("Migration terminée avec succès.");
    } catch (error) {
      console.error("Erreur lors de la migration:", error);
      throw error; // Propager l'erreur A AMELIORER
    } finally {
    }
  },

  async  truncateAllTables() {
    try {
      await client.connectDatabase();
  
      // Lister toutes les tables
      const tablesResult = await client.executeQuery(
        `SELECT TABLE_NAME FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_TYPE = 'BASE TABLE'`
      );
  
      // Utiliser map pour accéder aux noms de table
      const tables = tablesResult.map((table: { TABLE_NAME: any }) => table.TABLE_NAME);
  
      for (const tableName of tables) {
        // Générer le script de vidage de table
        const truncateTableScript = `TRUNCATE TABLE "${tableName}" RESTART IDENTITY CASCADE;`;
        console.log(truncateTableScript);
  
        // Exécuter le script de vidage de table
        await executeScriptsOnPostgres([truncateTableScript]);
      }
  
      console.log("Toutes les tables ont été vidées avec succès.");
    } catch (error) {
      console.error("Erreur lors du vidage des tables :", error);
      throw error; // Propager l'erreur
    }
  },

  async  DeleteAllTables() {
    try {
      await client.connectDatabase();
  
      // Lister toutes les tables
      const tablesResult = await client.executeQuery(
        `SELECT TABLE_NAME FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_TYPE = 'BASE TABLE'`
      );
  
      // Utiliser map pour accéder aux noms de table
      const tables = tablesResult.map((table: { TABLE_NAME: any }) => table.TABLE_NAME);
  
      for (const tableName of tables) {
        // Générer le script de vidage de table
        const truncateTableScript = `DROP TABLE "${tableName}" CASCADE;`;
        console.log(truncateTableScript);
  
        // Exécuter le script de vidage de table
        await executeScriptsOnPostgres([truncateTableScript]);
      }
  
      console.log("Toutes les tables ont été vidées avec succès.");
    } catch (error) {
      console.error("Erreur lors du vidage des tables :", error);
      throw error; // Propager l'erreur
    }
  },  
  

  async insertAll() {
    try {
        await client.connectDatabase();
        const tables = await client.executeQuery(`SELECT TABLE_NAME FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_TYPE = 'BASE TABLE'`);

        for (const table of tables) {
            const tableName = table.TABLE_NAME;
            const selectQuery = `SELECT * FROM ${tableName}`;
            const tableData = await client.executeQuery(selectQuery);

            for (const record of tableData) {
                const columns = Object.keys(record).join(", ");
                const values = Object.values(record).map(value => {
                  if (typeof value === 'boolean') {
                    return value ? 1 : 0; 
                  } else if (typeof value === 'string') {
                    const lowerCaseValue = value.toLowerCase();
                    if (lowerCaseValue === 't' || lowerCaseValue === 'true') return 1;
                    if (lowerCaseValue === 'f' || lowerCaseValue === 'false') return 0;
                  }
                  return value;
                });
              
              
              const placeholders = values.map((_, index) => `$${index + 1}`).join(", ");
              const insertQueryText = `INSERT INTO "${tableName}" (${columns}) VALUES (${placeholders}) ON CONFLICT DO NOTHING`;
              
              //console.log(insertQueryText, values);
                try {
                    await executeQuery(insertQueryText, values);
                } catch (insertError) {
                    console.error(`Error executing insert for table ${tableName}:`, insertError);
                }
            }

            console.log(`Table ${tableName} migrated successfully. ${tableData.length} records inserted.`);
        }
    } catch (error) {
        console.error("Migration failed:", error);
    }
    console.log("Migration completed successfully.");
},

async getAllCustomer(req: any, res: any) {
  try {

    const query= `SELECT * FROM "Customer";`;
    const tables = await pgClient.query(query);

    res.send(tables);

  } catch (err) {
    console.log(err);
    res.status(500).send("Erreur lors de la récupération des données.");
  }
},

async getAllItem(req: any, res: any) {
  try {

    const query= `SELECT *
    FROM "Item"
    ORDER BY caption ASC;
    `;
    const tables = await pgClient.query(query);


    res.send(tables);

  } catch (err) {
    console.log(err);
    res.status(500).send("Erreur lors de la récupération des données.");
  }
},

async editItemStock(req: any, res: any) {
  const {caption, newStock} = req.body;
  try {
    const query = `UPDATE "Item" SET realstock = ${newStock} WHERE caption = '${caption}'`;
    const result = await pgClient.query(query);
    res.send(result);
  } catch (err) {
    console.log(err);
    res.status(500).send("Erreur lors de la récupération des données.");
  }
},

async deleteItem(req: any, res: any) {
  await client.connectDatabase();

  const {uniqueid} = req.body;
  try {
    const query = `DELETE FROM "Item" WHERE uniqueid = '${uniqueid}'`;
    const result = await client.executeQuery(query);
    res.send(result);
  }
  catch (err) {
    console.log(err);
    res.status(500).send("Erreur lors de la récupération des données.");
  }
},

async getItemByCaption(req: any, res: any) {
  await client.connectDatabase();

  const {uniqueid} = req.body;
  try {
    const query = `SELECT * FROM "Item" WHERE uniqueid = '${uniqueid}'`;
    const result = await client.executeQuery(query);
    res.send(result);
  } catch (err) {
    console.log(err);
    res.status(500).send("Erreur lors de la récupération des données.");
  }
},



};

export default fullSwapController;
