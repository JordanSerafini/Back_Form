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
      const { caption, startDateTime, endDateTime, expectedDuration, achievedDuration, colleagueId, notesClear, xx_type_tache } = req.body;
  
      const query = `INSERT INTO event (Caption, StartDateTime, EndDateTime, ExpectedDuration_DurationInHours, AchievedDuration_DurationInHours, ColleagueId, NotesClear, xx_Type_Tache)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`;
  
      const values = [caption, startDateTime, endDateTime, expectedDuration, achievedDuration, colleagueId, notesClear, xx_type_tache];
  
      await pool.query(query, values);
      res.send("Evenement ajouté avec succès");
    } catch (err) {
      console.log(err);
      res.status(500).send("Erreur lors de l'ajout de l'événement.");
    }
  },

};
  
  
  export default eventController;