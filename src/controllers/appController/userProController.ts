import { Request, Response } from 'express';
import bcrypt from 'bcrypt'; 
import { pool } from '../../database/client/pool'; 
import jwt from 'jsonwebtoken';

class UserProController {
  private static readonly saltRounds: number = 10;

  public static async createUser(req: Request, res: Response): Promise<void> {
    const { email, password } = req.body;

    try {
      const checkUserQuery = 'SELECT * FROM utilisateurs WHERE email = $1';
      const checkUserResult = await pool.query(checkUserQuery, [email]);

      if (checkUserResult.rows.length > 0) {
        res.status(409).json({ error: 'L\'utilisateur existe déjà' });
        return;
      }

      // Hachez le mot de passe avant de l'enregistrer en base de données
      const hashedPassword = await bcrypt.hash(password, UserProController.saltRounds);

      // Enregistrez l'utilisateur dans la base de données avec le mot de passe haché
      const insertUserQuery = 'INSERT INTO utilisateurs (email, password) VALUES ($1, $2)';
      await pool.query(insertUserQuery, [email, hashedPassword]);

      res.status(201).json({ message: 'Utilisateur créé avec succès' });
    } catch (error) {
      console.error('Erreur lors de la création de l\'utilisateur :', error);
      res.status(500).json({ error: 'Erreur serveur' });
    }
  }

  public static async getUtilisateurInfo(req: Request, res: Response): Promise<void> {
    const token = req.headers.authorization?.split(' ')[1]; // Récupérer le token depuis les en-têtes de la requête

    if (!token) {
      res.status(401).json({ error: 'Token non fourni' });
      return;
    }

    try {
      const decodedToken: any = jwt.verify(token, process.env.SECRET_KEY!); 
      const email = decodedToken.email; // Extrayez l'adresse e-mail du token

      const getUserQuery = 'SELECT * FROM utilisateurs WHERE email = $1';
      const getUserResult = await pool.query(getUserQuery, [email]);

      if (getUserResult.rows.length === 0) {
        res.status(404).json({ error: 'Utilisateur non trouvé' });
        return;
      }

      const user = getUserResult.rows[0];
      delete user.password;

      res.status(200).json(user);
    } catch (error) {
      console.error('Erreur lors de la récupération des informations de l\'utilisateur :', error);
      res.status(500).json({ error: 'Erreur serveur' });
    }
  }
}

export default UserProController;
