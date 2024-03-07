import {pool} from "../../database/client/pool";


const itemController = {
    async getAllitem(req: any, res: any) {
      try {
  
        const query= "SELECT * FROM item ORDER BY id ASC;";
        const tables = await pool.query(query);

        res.send(tables);

      } catch (err) {
        console.log(err);
        res.status(500).send("Erreur lors de la récupération des données.");
      }
  },

  async insertItem(articleData: { caption: string; salepricevatexcluded: any; salepricevatincluded: any; realstock: any; descomclear: any; image_url: any; uniqueid: any; familyid: any; notesclear: any; supplierid: any; itemtype: any; itemimage: any; unitid: any; }) {
    const {
      caption,
      salepricevatexcluded,
      salepricevatincluded, 
      realstock,
      descomclear, 
      image_url, 
      uniqueid, 
      familyid, 
      notesclear, 
      supplierid, 
      itemtype, 
      itemimage, 
      unitid, 
    } = articleData;
  
    const query =
      "INSERT INTO item (caption, salepricevatexcluded, salepricevatincluded, realstock, descomclear, image_url, uniqueid, familyid, notesclear, supplierid, itemtype, itemimage, unitid) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13) RETURNING *";
  
    const values = [
      caption,
      salepricevatexcluded,
      salepricevatincluded,
      realstock,
      descomclear,
      image_url,
      uniqueid,
      familyid,
      notesclear,
      supplierid,
      itemtype,
      itemimage,
      unitid,
    ];
  
    try {
      const result = await pool.query(query, values);
      return result.rows[0];
    } catch (error) {
      console.error("Erreur lors de l'ajout de l'article :", error);
      throw error;
    }
  }
  
  
  
  };
  
  export default itemController;