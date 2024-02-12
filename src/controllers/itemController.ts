import {pool} from "../database/pool";


const itemController = {
    // Fonction pour obtenir la liste des tables
    async getAllitem(req: any, res: any) {
      try {
  
        const query= "SELECT * FROM item";
        const tables = await pool.query(query);

        res.send(tables);

      } catch (err) {
        console.log(err);
        res.status(500).send("Erreur lors de la récupération des données.");
      }
  },
  
  
  };
  
  export default itemController;