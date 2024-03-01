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
      throw error; // Propager l'erreur A AMELIORER
    } finally {
      await pool.end();
    }
  },



  async getAndInsertItem() {
    try {
      await client.connectDatabase(); // Connexion à la première base de données
  
      const query = "SELECT * FROM Item";
      const result = await client.executeQuery(query);
      // Nous traitons 'result' comme contenant directement les données à insérer
  
      const poolClient = await pool.connect(); // Connexion à la seconde base de données
  
      try {
        await poolClient.query('BEGIN');
  
        for (const item of result) {
          const columns = Object.keys(item).join(', ');
          // Convertissez chaque valeur booléenne en true ou false
          const values = Object.values(item).map(value => 
            typeof value === 'boolean' ? value : value // Ajoutez ici la logique de conversion si nécessaire
          );
          const placeholders = values.map((_, index) => `$${index + 1}`).join(', ');
          console.log('columns:', columns);
          console.log('values:', values);
          console.log('placeholders:', placeholders);
        
          const insertQuery = `INSERT INTO "Item" (${columns}) VALUES (${placeholders})`;
        
          try {
            // Exécution de la requête d'insertion avec les valeurs de chaque item
            await poolClient.query(insertQuery, values);
          } catch (error) {
            console.error('Erreur d\'insertion pour l\'item:', item, 'Erreur:', error);
            // Vous pouvez choisir de lancer une exception ici ou de continuer avec les autres items
          }
        }
        
  
        await poolClient.query('COMMIT');
        console.log('Tous les items ont été insérés avec succès dans la base de données cible.');
      } catch (error) {
        await poolClient.query('ROLLBACK');
        console.error('Erreur lors de l\'insertion des items:', error);
        throw error;
      } finally {
        poolClient.release(); // Libération du client de pool
      }
    } catch (error) {
      console.error('Erreur lors de la récupération ou de l\'insertion des items:', error);
      throw error;
    }
  }
  

  
 

};

export default swapEbpController;
