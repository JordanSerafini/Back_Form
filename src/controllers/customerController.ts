import {pool} from "../database/pool";


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
  
  
  };
  
  export default customerController;