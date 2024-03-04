import { Request, Response } from "express";
import client from "../database/client";
import { pool } from "../database/pool";


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
    try {
        const clientPG = await pool.connect();

        // Connectez-vous à la base de données externe
        await client.connectDatabase();

        // Récupérez les données de l'événement depuis la source externe
        const query = `SELECT * FROM ScheduleEvent`;
        const result = await client.executeQuery(query); 

        // Vérifiez si le résultat est un tableau
        if (!Array.isArray(result)) {
            throw new Error('Le résultat n\'est pas un tableau');
        }

        // Récupérez toutes les colonnes de la table ScheduleEvent
        const allColumns = Object.keys(result[0]);

        // Boucle sur les résultats pour les insérer dans la base de données PostgreSQL
        for (const item of result) {
            try {
                // Générer les colonnes et les valeurs à insérer dans la base de données
                const columns = allColumns.join(', ');
                const placeholders = allColumns.map((_, index) => `$${index + 1}`).join(', ');
                const values = allColumns.map(column => item[column]);

                const insertQuery = `
                    INSERT INTO event (${columns})
                    VALUES (${placeholders})
                `;

                // Insérez les données dans la base de données PostgreSQL
                await clientPG.query(insertQuery, values);
            } catch (error) {
                // En cas d'erreur lors de l'insertion, affichez l'erreur et les données problématiques
                console.error("Erreur lors de l'insertion d'une ligne :", error);
                console.log("Données problématiques :", item);
            }
        }

        // Répondez avec un message de succès si tout se passe bien
        res.status(201).json({ message: "Les données ont été récupérées depuis la source externe et insérées dans PostgreSQL avec succès." });
    } catch (err) {
        // En cas d'erreur, affichez l'erreur et répondez avec un code d'erreur HTTP 500
        console.error("Erreur lors de la récupération/insertion des données :", err);
        res.status(500).json({ error: "Échec de la récupération des données depuis la source externe ou de l'insertion dans PostgreSQL." });
    } finally {
      // Assurez-vous de libérer la connexion du pool PostgreSQL
      //await pool.release(clientPG);
    }
}



};

export default swapController;
