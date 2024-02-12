import { Request, Response } from 'express';
import client from '../database/client'; 
import { pool } from '../database/pool'; 
import { IRecordSet } from 'mssql';

const swapController = {
  
  async fetchDataFromMSSQL(req: Request, res: Response) {
    try {
      await client.connectDatabase();
      const query = `SELECT * FROM item`; 
      const data = await client.executeQuery(query);
      return data; 
    } catch (err) {
      console.error("Error fetching data from MSSQL:", err);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  },

  async insertDataIntoPostgreSQL(req: Request, res: Response) {
    try {
      const data = await this.fetchDataFromMSSQL(req, res) as IRecordSet<any>;

      await pool.connect();


      for (const item of data) {
        // Génération des placeholders et des valeurs pour la requête SQL
        const columns = Object.keys(item).join(', ');
        const placeholders = Object.keys(item).map((_, index) => `$${index + 1}`).join(', ');
        const values = Object.values(item);

        const insertQuery = `
          INSERT INTO item (${columns})
          VALUES (${placeholders})
        `;

        // Exécution de la requête d'insertion
        await pool.query(insertQuery, values);
      }

      res.status(201).json({ message: "Data inserted successfully into PostgreSQL" });
    } catch (error) {
      console.error("Error inserting data into PostgreSQL:", error);
      res.status(500).json({ error: "Failed to insert data into PostgreSQL" });
    } finally {
      pool.end(); // Assurez-vous de fermer la connexion à la base de données
    }
  }
};

export default swapController;
