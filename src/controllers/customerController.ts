import { pool } from "../database/pool";

const customerController = {
  async getAllcustomer(req: any, res: any) {
    try {
      // Récupérer les paramètres de pagination de la requête, avec des valeurs par défaut
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 25; // Nombre de résultats par page
      const offset = (page - 1) * limit;

      // Modifier la requête pour supporter la pagination
      const query = "SELECT * FROM customer ORDER BY id ASC LIMIT $1 OFFSET $2;";
      
      // Exécuter la requête avec pagination
      const tables = await pool.query(query, [limit, offset]);

      // Optionnel : Calculer le nombre total de clients pour la pagination côté client
      const countResult = await pool.query("SELECT COUNT(*) FROM customer;");
      const totalCount = parseInt(countResult.rows[0].count);

      // Construire l'objet de réponse avec les clients et les informations de pagination
      const response = {
        data: tables.rows, // Les clients pour la page actuelle
        pageInfo: {
          currentPage: page,
          limit: limit,
          totalCount: totalCount,
          totalPages: Math.ceil(totalCount / limit),
        },
      };

      res.json(response);

    } catch (err) {
      console.log(err);
      res.status(500).send("Erreur lors de la récupération des données.");
    }
  },
};

export default customerController;
