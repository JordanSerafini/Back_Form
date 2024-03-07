import client from "../../database/client/client";

const itemController = {
 
  async getAllItem(req: any, res: any) {
    try {

      await client.connectDatabase();

      const query= "SELECT * FROM Item";
      const tables = await client.executeQuery(query);

      res.send(tables);

    } catch (err) {
      console.log(err);
      res.status(500).send("Erreur lors de la récupération des données.");
    }
},
};

export default itemController;
