import {pool} from "../database/pool";

const eventController = {
    async getAllevent(req: any, res: any) {
      try {
  
        const query= "SELECT * FROM event ORDER BY date ASC;";
        const tables = await pool.query(query);

        res.send(tables);

      } catch (err) {
        console.log(err);
        res.status(500).send("Erreur lors de la récupération des données.");
      }
  },
  
  
  };
  
  export default eventController;