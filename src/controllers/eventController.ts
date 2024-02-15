import {pool} from "../database/pool";

const eventController = {
    async getAllevent(req: any, res: any) {
      try {
  
        const query= "SELECT * FROM event ORDER BY startdatetime ASC;";
        const tables = await pool.query(query);

        res.send(tables);

      } catch (err) {
        console.log(err);
        res.status(500).send("Erreur lors de la récupération des données.");
      }
  },

  async insertEvent(req: any, res: any) {
    try {
      const { caption, startdatetime, enddatetime, expectedduration_durationinhours, achievedduration_durationinhours, colleagueId, notesclear, xx_type_tache } = req.body;
      const query = `INSERT INTO event (caption, startdatetime, enddatetime, expectedduration_durationinhours, achievedduration_durationinhours, colleagueId, notesclear, xx_type_tache)
      VALUES ('${caption}', '${startdatetime}', '${enddatetime}', ${expectedduration_durationinhours}, ${achievedduration_durationinhours}, '${colleagueId}', '${notesclear}', '${xx_type_tache}')`;
      await pool.query(query);
      res.send("Evenement ajouté avec succès");
    } catch (err) {
      console.log(err);
      res.status(500).send("Erreur lors de l'ajout de l'événement.");
    }
  },

};
  
  
  export default eventController;