import { pool } from '../database/pool';
import Model from './model';
import bcrypt from 'bcrypt';

class UserProModel extends Model{
  public id: number;
  public email: string;
  public hashedPassword: string; // Stockez le mot de passe haché

  constructor(id: number, email: string, hashedPassword: string) {
    super();
    this.id = id;
    this.email = email;
    this.hashedPassword = hashedPassword;
  }

  // Méthode pour récupérer un utilisateur par son adresse e-mail
  public static async getUserByEmail(email: string): Promise<UserProModel | null> {
    const sql = 'SELECT * FROM utilisateurs WHERE email = $1';
    try {
      const { rows } = await pool.query(sql, [email]);
      if (rows.length > 0) {
        const { id, email, hashed_password } = rows[0];
        return new UserProModel(id, email, hashed_password);
      } else {
        return null;
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error('Erreur lors de la récupération de l\'utilisateur par e-mail:', error.message);
      } else {
        console.error('Une erreur inconnue est survenue lors de la récupération de l\'utilisateur par e-mail');
      }
      throw error;
    }
  }

  // Méthode pour insérer un utilisateur avec mot de passe haché
  public static async insertUserWithHashedPassword(email: string, hashedPassword: string): Promise<void> {
    const sql = 'INSERT INTO utilisateurs (email, hashed_password) VALUES ($1, $2)';
    try {
      await pool.query(sql, [email, hashedPassword]);
      console.log('Utilisateur inséré avec succès.');
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error('Erreur lors de l\'insertion de l\'utilisateur avec mot de passe haché:', error.message);
      } else {
        console.error('Une erreur inconnue est survenue lors de l\'insertion de l\'utilisateur avec mot de passe haché');
      }
      throw error;
    }
  }

  // Méthode pour

}

export default UserModel;
