import { pool } from "../../database/client/pool";
import client from "../../database/client/client";

/* CASE 
                 
                 ELSE DATA_TYPE 
               END AS DATA_TYPE

               */

const CreateTableController = {
  async createTableWithColumns(req: any, res: any) {
    try {
      // Connexion à la base de données
      await client.connectDatabase();

      const selectColumnsQuery = `
      SELECT COLUMN_NAME,
      CASE 
        WHEN DATA_TYPE = 'tinyint' THEN 'SMALLINT' 
        WHEN DATA_TYPE = 'uniqueidentifier' THEN 'UUID' 
        WHEN DATA_TYPE = 'datetime' THEN 'timestamp' 
        WHEN DATA_TYPE = 'nvarchar' THEN 'text'
        WHEN DATA_TYPE = 'varbinary' THEN 'bytea'
          ELSE DATA_TYPE 
          END AS DATA_TYPE
      FROM INFORMATION_SCHEMA.COLUMNS 
      WHERE TABLE_NAME = 'ScheduleEventType'
      `;

      const columns = await client.executeQuery(selectColumnsQuery);

      // Générer la requête de création de table avec les colonnes et types de données récupérés
      let createTableQuery = "CREATE TABLE IF NOT EXISTS eventType (";
      columns.forEach((column: any, index: number) => {
        createTableQuery += `${column.COLUMN_NAME} ${column.DATA_TYPE}`;
        if (index !== columns.length - 1) {
          createTableQuery += ", ";
        }
      });
      createTableQuery += ")";

      // Utiliser la piscine de connexions pour exécuter la requête de création de table
      await pool.query(createTableQuery);
      console

      res
        .status(200)
        .send(
          "La nouvelle table avec les métadonnées a été créée avec succès."
        );
    } catch (err) {
      console.error(err);
      res.status(500).send("Erreur lors de la création de la nouvelle table.");
    }
  },
};

export default CreateTableController;
