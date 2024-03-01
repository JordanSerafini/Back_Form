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
        // Générer le script de création de table PostgreSQL
        const createTableScript = generatePostgresSchema(tableName, columns);

        // Exécuter le script de création de table PostgreSQL
        await executeScriptsOnPostgres([createTableScript]);
      }

      console.log('Migration terminée avec succès.');
    } catch (error) {
      console.error('Erreur lors de la migration:', error);
      throw error; // Propager l'erreur pour une gestion ultérieure si nécessaire
    } finally {
      await pool.end();
    }
  }
};

export default swapEbpController;
