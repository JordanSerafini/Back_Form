import client from "../../database/client";

const tableController = {
  // Fonction pour obtenir la liste des tables
  async getAllTables(req: any, res: any) {
    try {
      await client.connectDatabase();

      const query = "SELECT t.name AS table_name FROM sys.tables t";
      const tables = await client.executeQuery(query);

      res.send(tables);
    } catch (err) {
      console.log(err);
      res.status(500).send("Erreur lors de la récupération des données.");
    }
  },

  async test(req: any, res: any) {
    try {

      await client.connectDatabase();

      const query= "SELECT * FROM SaleDocument";
      const tables = await client.executeQuery(query);

      res.send(tables);

    } catch (err) {
      console.log(err);
      res.status(500).send("Erreur lors de la récupération des données.");
    }
},
};

export default tableController;
