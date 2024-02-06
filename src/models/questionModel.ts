import { pool } from '../database/pool';

class QuestionModel {
  public id: number;
  public formID: number;
  public questionID: number;
  public rating: number;
  public userID: number;

  constructor(id: number, formID: number, questionID: number, rating: number, userID: number) {
    this.id = id;
    this.formID = formID;
    this.questionID = questionID;
    this.rating = rating;
    this.userID = userID;
  }

  // Méthode pour insérer une question
  public static async insertQuestion(formID: number, questionID: number, rating: number, userID: number): Promise<void> {
    const sql = 'INSERT INTO question (formID, questionID, rating, userID) VALUES ($1, $2, $3, $4)';
    try {
      await pool.query(sql, [formID, questionID, rating, userID]);
      console.log('Question insérée avec succès.');
    } catch (error: unknown) { // Utilisez unknown comme type d'erreur.
      if (error instanceof Error) {
        console.error('Erreur lors de l\'insertion de la question:', error.message);
      } else {
        console.error('Une erreur inconnue est survenue lors de l\'insertion de la question');
      }
      throw error;
    }
  }

  // Méthode pour supprimer une question par son ID
  public static async deleteQuestionById(id: number): Promise<void> {
    const sql = 'DELETE FROM question WHERE id = $1';
    try {
      await pool.query(sql, [id]);
      console.log(`Question avec l'ID ${id} supprimée avec succès.`);
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error(`Erreur lors de la suppression de la question avec l'ID ${id}:`, error.message);
      } else {
        console.error(`Une erreur inconnue est survenue lors de la suppression de la question avec l'ID ${id}`);
      }
      throw error;
    }
  }
}

export default QuestionModel;
