import { pool } from '../database/client/pool';
import Model from './model';

class FormModel extends Model {
  public id: number;
  public userID: number;

  constructor(id: number, userID: number) {
    super();
    this.id = id;
    this.userID = userID;
  }

  // Méthode pour insérer un formulaire
  public static async insertForm(userID: number): Promise<FormModel> {
    const sql = 'INSERT INTO form (userID) VALUES ($1) RETURNING *';
    try {
      const res = await pool.query(sql, [userID]);
      console.log('Formulaire inséré avec succès. ID:', res.rows[0]?.id);
      return new FormModel(res.rows[0].id, res.rows[0].userID);
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error('Erreur lors de l\'insertion du formulaire:', error.message);
      } else {
        console.error('Une erreur inconnue est survenue lors de l\'insertion du formulaire');
      }
      throw error;
    }
  }

  // Méthode pour récupérer un formulaire par son ID
  public static async getFormById(id: number): Promise<FormModel | null> {
    const sql = 'SELECT * FROM form WHERE id = $1';
    try {
      const result = await pool.query(sql, [id]);
      if (result.rows.length) {
        return new FormModel(result.rows[0].id, result.rows[0].userID);
      }
      return null;
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error('Erreur lors de la récupération du formulaire:', error.message);
      } else {
        console.error('Une erreur inconnue est survenue lors de la récupération du formulaire');
      }
      throw error;
    }
  }

  // Méthode pour récupérer tous les formulaires d'un utilisateur par son ID
  public static async getFormsByUserId(userID: number): Promise<FormModel[] | null> {
    const sql = 'SELECT * FROM form WHERE userID = $1';
    try {
      const result = await pool.query(sql, [userID]);
      return result.rows.map(row => new FormModel(row.id, row.userID));
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error('Erreur lors de la récupération des formulaires:', error.message);
      } else {
        console.error('Une erreur inconnue est survenue lors de la récupération des formulaires');
      }
      throw error;
    }
  }
}

export default FormModel;
