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

  // Fonction pour obtenir la liste des evenements de planning
  async getScheduleEvent(req: any, res: any) {
    try {
      
      await client.connectDatabase();
      
      const query= "SELECT * FROM ScheduleEvent ";
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

      const query= "SELECT * FROM ScheduleEventExpectedResource  ";
      const tables = await client.executeQuery(query);

      res.send(tables);

    } catch (err) {
      console.log(err);
      res.status(500).send("Erreur lors de la récupération des données.");
    }
},
};

export default tableController;
