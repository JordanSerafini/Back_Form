import { Request, Response } from 'express';
import client from '../database/client'; 
import { pool } from '../database/pool'; 

const swapController = {
  async fetchAndInsertItem(req: Request, res: Response) {
    const clientPG = await pool.connect();
    try {
      await client.connectDatabase();
      const queryEBP = `SELECT * FROM item`; // Récupération des données de MSSQL
      const EBPdata = await client.executeQuery(queryEBP);
  
      const queryPG = 'SELECT caption FROM item'; // Récupération uniquement des captions de PostgreSQL
      const PGresult = await clientPG.query(queryPG);
      const PGcaptions = PGresult.rows.map(item => item.caption); // Extraction des captions
  
      if (!Array.isArray(EBPdata)) {
        throw new Error('Le résultat n\'est pas un tableau');
      }
  
      // Conversion de PGcaptions en un ensemble pour une recherche rapide
      const PGCaptionSet = new Set(PGcaptions);
  
      for (const item of EBPdata) {
        // Vérifiez si l'item existe déjà dans PGdata basé sur le caption
        if (!PGCaptionSet.has(item.caption)) { // Utilisation de 'caption' pour vérifier l'unicité
          const columns = Object.keys(item).join(', ');
          const placeholders = Object.keys(item).map((_, index) => `$${index + 1}`).join(', ');
          const values = Object.values(item);
  
          const insertQuery = `
            INSERT INTO item (${columns})
            VALUES (${placeholders})
          `;
          await clientPG.query(insertQuery, values);
        }
      }
  
      res.status(201).json({ message: "Data fetched from MSSQL and new items inserted into PostgreSQL successfully based on unique captions" });
    } catch (err) {
      console.error("Error during data fetch/insert:", err);
      res.status(500).json({ error: "Failed to fetch from MSSQL or insert into PostgreSQL" });
    } finally {
      clientPG.release();
    }
  },
  

  async fetchAndInsertCustomer(req: Request, res: Response) {
    const clientPG = await pool.connect();
    try {
      await client.connectDatabase();
      const query = `SELECT * FROM customer`; 
      const result = await client.executeQuery(query);

      if (!Array.isArray(result)) {
        throw new Error('Le résultat n\'est pas un tableau');
      }

      for (const item of result) {
        const columns = Object.keys(item).join(', ');
        const placeholders = Object.keys(item).map((_, index) => `$${index + 1}`).join(', ');
        const values = Object.values(item);

        const insertQuery = `
          INSERT INTO customer (${columns})
          VALUES (${placeholders})
        `;
        await clientPG.query(insertQuery, values);
      }

      res.status(201).json({ message: "Data fetched from MSSQL and inserted into PostgreSQL successfully" });
    } catch (err) {
      console.error("Error during data fetch/insert:", err);
      res.status(500).json({ error: "Failed to fetch from MSSQL or insert into PostgreSQL" });
    } finally {
      clientPG.release();
    }
  }
};

export default swapController;
