import { pool } from '../database/pool';
import Model from './model';

class CommentModel extends Model{
  public id: number;
  public formID: number;
  public comment: string;
  public userID: number;

  constructor(id: number, formID: number, comment: string, userID: number) {
    super();
    this.id = id;
    this.formID = formID;
    this.comment = comment;
    this.userID = userID;
  }

  // Méthode pour insérer un commentaire
  public static async insertComment(formID: number, commentText: string, userID: number): Promise<void> {
    const sql = 'INSERT INTO comment (formID, comment, userID) VALUES ($1, $2, $3)';
    try {
      const res = await pool.query(sql, [formID, commentText, userID]);
      console.log('Commentaire inséré avec succès. ID:', res.rows[0]?.id); 
    } catch (error: unknown) { // Utilisez unknown comme type d'erreur.
      if (error instanceof Error) {
        console.error('Erreur lors de l\'insertion du commentaire:', error.message);
      } else {
        console.error('Une erreur inconnue est survenue lors de l\'insertion du commentaire');
      }
      throw error;
    }
  }

  // Méthode pour supprimer un commentaire par son ID
  public static async deleteCommentById(id: number): Promise<void> {
    const sql = 'DELETE FROM comment WHERE id = $1';
    try {
      await pool.query(sql, [id]);
      console.log(`Commentaire avec l'ID ${id} supprimé avec succès.`);
    } catch (error: unknown) { // Utilisez unknown comme type d'erreur.
      if (error instanceof Error) {
        console.error(`Erreur lors de la suppression du commentaire avec l'ID ${id}:`, error.message);
      } else {
        console.error(`Une erreur inconnue est survenue lors de la suppression du commentaire avec l'ID ${id}`);
      }
      throw error;
    }
  }

  public static async getCommentsByUserId(userID: number): Promise<CommentModel[] | null> {
    const sql = 'SELECT * FROM comment WHERE userID = $1';
    try {
      const result = await pool.query(sql, [userID]);
      const comments: CommentModel[] = result.rows;
      return comments;
    } catch (error: unknown) { // Utilisez unknown comme type d'erreur.
      if (error instanceof Error) {
        console.error('Erreur lors de la récupération des commentaires:', error.message);
      } else {
        console.error('Une erreur inconnue est survenue lors de la récupération des commentaires');
      }
      throw error;
    }
  }

  }

export default CommentModel;
