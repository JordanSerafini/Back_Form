import { pool } from "../database/pool";
import client from '../database/client';
import indexController from "./indexController";
import { executeScriptsOnPostgres, generatePostgresSchema } from "./functionEbp";

interface TableAndColumns {
  tableName: string;
  columns: { COLUMN_NAME: string; DATA_TYPE: string; CHARACTER_MAXIMUM_LENGTH: number; IS_NULLABLE: string; COLUMN_DEFAULT: any }[];
}

const swapEbpController = {
  // Fonction principale pour démarrer la migration
  async migrateDatabase() {
    try {
      await client.connectDatabase();

      // Lister les tables et leurs schémas
      const tablesAndSchemas: TableAndColumns[] = await indexController.listTablesAndSchemas();

      for (const { tableName, columns } of tablesAndSchemas) {
        const createTableScript = generatePostgresSchema(tableName, columns);
        await executeScriptsOnPostgres([createTableScript]);
      }

      console.log('Migration terminée avec succès.');
    } catch (error) {
      console.error('Erreur lors de la migration:', error);
    } finally {
      await pool.end();
    }
  }
};

export default swapEbpController;
