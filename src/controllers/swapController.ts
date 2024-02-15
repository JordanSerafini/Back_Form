import { Request, Response } from "express";
import client from "../database/client";
import { pool } from "../database/pool";

interface Customer {
  name: string;
  maininvoicingcontact_phone: string;
}

const swapController = {
  async fetchAndInsertItem(req: Request, res: Response) {
    const clientPG = await pool.connect();
    try {
      await client.connectDatabase();
      const queryEBP = `SELECT * FROM item`; // Récupération des données de MSSQL
      const EBPdata = await client.executeQuery(queryEBP);

      const queryPG = "SELECT caption FROM item"; // Récupération uniquement des captions de PostgreSQL
      const PGresult = await clientPG.query(queryPG);
      const PGcaptions = PGresult.rows.map((item) => item.caption); // Extraction des captions

      if (!Array.isArray(EBPdata)) {
        throw new Error("Le résultat n'est pas un tableau");
      }

      // Conversion de PGcaptions en un ensemble pour une recherche rapide
      const PGCaptionSet = new Set(PGcaptions);

      for (const item of EBPdata) {
        // Vérifiez si l'item existe déjà dans PGdata basé sur le caption
        if (!PGCaptionSet.has(item.caption)) {
          // Utilisation de 'caption' pour vérifier l'unicité
          const columns = Object.keys(item).join(", ");
          const placeholders = Object.keys(item)
            .map((_, index) => `$${index + 1}`)
            .join(", ");
          const values = Object.values(item);

          const insertQuery = `
            INSERT INTO item (${columns})
            VALUES (${placeholders})
          `;
          await clientPG.query(insertQuery, values);
        }
      }

      res
        .status(201)
        .json({
          message:
            "Data fetched from MSSQL and new items inserted into PostgreSQL successfully based on unique captions",
        });
    } catch (err) {
      console.error("Error during data fetch/insert:", err);
      res
        .status(500)
        .json({
          error: "Failed to fetch from MSSQL or insert into PostgreSQL",
        });
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
        throw new Error("Le résultat n'est pas un tableau");
      }

      // Tri des résultats en fonction des propriétés `name` et `maininvoicingcontact_phone`
      result.sort((a, b) => {
        // Comparaison insensible à la casse pour `name`
        const nameCompare = (a.name || "")
          .toLowerCase()
          .localeCompare((b.name || "").toLowerCase());
        if (nameCompare !== 0) return nameCompare;
        // Si les noms sont égaux, on compare le `maininvoicingcontact_phone`
        return (a.maininvoicingcontact_phone || "")
          .toLowerCase()
          .localeCompare((b.maininvoicingcontact_phone || "").toLowerCase());
      });

      for (const item of result) {
        // Mappez les noms des colonnes de MSSQL (PascalCase) vers PostgreSQL (minuscules)
        const columns = Object.keys(item)
          .map((key) => key.charAt(0).toLowerCase() + key.slice(1))
          .join(", ");
        const placeholders = Object.keys(item)
          .map((_, index) => `$${index + 1}`)
          .join(", ");
        const values = Object.values(item);

        const insertQuery = `
          INSERT INTO customer (${columns})
          VALUES (${placeholders})
        `;
        await clientPG.query(insertQuery, values);
      }

      res
        .status(201)
        .json({
          message:
            "Data fetched from MSSQL, sorted by name and phone, and inserted into PostgreSQL successfully",
        });
    } catch (err) {
      console.error("Error during data fetch/insert:", err);
      res
        .status(500)
        .json({
          error: "Failed to fetch from MSSQL or insert into PostgreSQL",
        });
    } finally {
      clientPG.release();
    }
  },

  async fetchAndInsertEvent(req: Request, res: Response) {
    const clientPG = await pool.connect();
    try {
        await client.connectDatabase();
        const query = `SELECT * FROM ScheduleEvent`;
        const result = await client.executeQuery(query); 
        if (!Array.isArray(result)) {
            throw new Error('Le résultat n\'est pas un tableau');
        }

        // Obtenez la liste des colonnes de votre modèle de table "event"
        const eventColumns = ['caption', 'startdatetime', 'enddatetime', 'expectedduration_durationinhours', 'achievedduration_durationinhours', 'scheduleeventnumber', 'invoicecustomerid', 'dealid', 'colleagueid', 'notesclear', 'xx_type_tache', 'xx_theme', 'expectedduration_duration', 'expectedduration_unitid'];

        // Boucle sur les résultats pour les insérer dans la base de données PostgreSQL
        for (const item of result) {
            // Filtrez les colonnes pour ne prendre en compte que celles qui existent dans votre modèle de table "event"
            const validColumns = Object.keys(item).filter(column => eventColumns.includes(column.toLowerCase()));
            const columns = validColumns.join(', ');
            const placeholders = validColumns.map((_, index) => `$${index + 1}`).join(', ');
            const values = validColumns.map(column => item[column]);

            const insertQuery = `
                INSERT INTO event (${columns})
                VALUES (${placeholders})
            `;
            await clientPG.query(insertQuery, values);
        }

        res.status(201).json({ message: "Data fetched from external source and inserted into PostgreSQL successfully" });
    } catch (err) {
        console.error("Error during data fetch/insert:", err);
        res.status(500).json({ error: "Failed to fetch data from external source or insert into PostgreSQL" });
    } finally {
        clientPG.release();
    }
}



};

export default swapController;
