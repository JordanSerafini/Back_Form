import {pool} from "../database/pool";
import coordinateService from "../services/coordinateService";


const customerController = {
    async getAllcustomer(req: any, res: any) {
      try {
  
        const query= "SELECT * FROM customer ORDER BY id ASC;";
        const tables = await pool.query(query);

        res.send(tables);

      } catch (err) {
        console.log(err);
        res.status(500).send("Erreur lors de la récupération des données.");
      }
  },

  async insertCoordinate(req: any, res: any) {
    try {
      const { id, adresse } = req.body;
      const { error, longitude, latitude } = await coordinateService.getAdressCoordinate(adresse);
      if (error) {
        res.status(500).send
        return;
      }
      const query = `UPDATE customer SET longitude = ${longitude}, latitude = ${latitude} WHERE id = ${id};`;
      await pool.query(query);
      res.send("Coordonnées insérées avec succès");
    } catch (err) {
      console.log(err);
      res.status(500).send("Erreur lors de l'insertion des coordonnées.");
    }
  }
  
  
  };
  
  export default customerController;