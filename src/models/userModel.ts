import { pool } from '../database/pool';

class UserModel {
  public id: number;
  public name: string;
  public fonction: string;
  public date: Date;

  constructor(id: number, name: string, fonction: string, date: Date) {
    this.id = id;
    this.name = name;
    this.fonction = fonction;
    this.date = date;
  }

  // Méthode pour récupérer un utilisateur par son nom
  public static async getUserByName(name: string): Promise<UserModel | null> {
    const sql = 'SELECT * FROM "user" WHERE name = $1';
    try {
      const { rows } = await pool.query(sql, [name]);
      if (rows.length > 0) {
        const { id, name, fonction, date } = rows[0];
        return new UserModel(id, name, fonction, new Date(date));
      } else {
        return null;
      }
    } catch (error: unknown) { // Annoter l'erreur avec le type unknown
      if (error instanceof Error) {
        console.error('Erreur lors de la récupération de l\'utilisateur par nom:', error.message);
      } else {
        console.error('Une erreur inconnue est survenue lors de la récupération de l\'utilisateur par nom');
      }
      throw error;
    }
  }

  // Méthode pour insérer un utilisateur
  public static async insertUser(name: string, fonction: string, date: Date): Promise<void> {
    const sql = 'INSERT INTO "user" (name, fonction, date) VALUES ($1, $2, $3)';
    try {
      await pool.query(sql, [name, fonction, date]);
      console.log('Utilisateur inséré avec succès.');
    } catch (error: unknown) { // Annoter l'erreur avec le type unknown
      if (error instanceof Error) {
        console.error('Erreur lors de l\'insertion de l\'utilisateur:', error.message);
      } else {
        console.error('Une erreur inconnue est survenue lors de l\'insertion de l\'utilisateur');
      }
      throw error;
    }
  }

  // Méthode pour supprimer un utilisateur par son ID
  public static async deleteUserById(id: number): Promise<void> {
    const sql = 'DELETE FROM "user" WHERE id = $1';
    try {
      await pool.query(sql, [id]);
      console.log(`Utilisateur avec l'ID ${id} supprimé avec succès.`);
    } catch (error: unknown) { // Annoter l'erreur avec le type unknown
      if (error instanceof Error) {
        console.error(`Erreur lors de la suppression de l'utilisateur avec l'ID ${id}:`, error.message);
      } else {
        console.error(`Une erreur inconnue est survenue lors de la suppression de l'utilisateur avec l'ID ${id}`);
      }
      throw error;
    }
  }
}

export default UserModel;
