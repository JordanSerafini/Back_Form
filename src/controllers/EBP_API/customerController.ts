import client from "../../database/client";


const customerController = {
    // Fonction pour obtenir la liste des tables
    async getAllCustomer(req: any, res: any) {
      try {
  
        await client.connectDatabase();

        const query= "SELECT * FROM Customer ORDER BY Id ";
        const tables = await client.executeQuery(query);

        res.send(tables);

      } catch (err) {
        console.log(err);
        res.status(500).send("Erreur lors de la récupération des données.");
      }
  },
  
  
  };
  
  export default customerController;