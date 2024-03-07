import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

import { pool } from '../../database/client/pool'; 

class AuthController {
  private static readonly secretKey: string = process.env.SECRET_KEY as string;

  public static async loginWithEmailPassword(req: Request, res: Response): Promise<void> {
    const { email, password } = req.body;

    try {
      const userQuery = 'SELECT * FROM utilisateurs WHERE email = $1';
      const userResult = await pool.query(userQuery, [email]);

      if (userResult.rows.length === 1) {
        const user = userResult.rows[0];

        // Comparaison du mot de passe fourni avec le mot de passe haché en base de données
        const passwordMatch = await bcrypt.compare(password, user.password);

        if (passwordMatch) {
          // Authentification réussie, générez un JWT avec l'adresse e-mail
          const token = jwt.sign({ email }, AuthController.secretKey, { expiresIn: '1h' });
          res.status(200).json({ token });
        } else {
          // Mot de passe incorrect
          res.status(401).json({ message: 'Mot de passe incorrect' });
        }
      } else {
        // Utilisateur non trouvé avec cette adresse e-mail
        res.status(401).json({ message: 'Utilisateur non trouvé' });
      }
    } catch (error) {
      console.error('Erreur lors de la vérification des informations d\'identification :', error);
      res.status(500).json({ message: 'Erreur serveur' });
    }
    if (!AuthController.secretKey) {
      console.error('SECRET_KEY n\'est pas défini.');
      res.status(500).json({ message: 'Erreur de configuration serveur' });
      return;
    }
  };


  public static async verifyToken(req: Request, res: Response): Promise<void> {
    const token = req.headers.authorization?.split(' ')[1];
  
    if (!token) {
      res.status(401).json({ message: 'No token provided' });
      return;
    }
  
    try {
      // Vérifier si le token est dans la liste noire
      const blacklistQuery = 'SELECT * FROM blacklisted_tokens WHERE token = $1';
      const blacklistResult = await pool.query(blacklistQuery, [token]);
      if (blacklistResult.rows.length > 0) {
        // Token présent dans la liste noire, considéré comme invalide
        res.status(401).json({ message: 'Token is blacklisted' });
        return;
      }
  
      const decoded = jwt.verify(token, AuthController.secretKey);
  
      // Token valide
      res.status(200).json({ message: 'Token is valid', decoded });
    } catch (error) {
      console.error('Error verifying token:', error);
      res.status(401).json({ message: 'Invalid token' });
    }
  };
  

  public static async invalidateToken(req: Request, res: Response): Promise<void> {
    const token = req.headers.authorization?.split(' ')[1];
    
    if (!token) {
      res.status(401).json({ message: 'No token provided' });
      return;
    }
    
    try {
      // Ajouter le token à la liste noire dans la base de données
      const query = 'INSERT INTO blacklisted_tokens (token) VALUES ($1)';
      await pool.query(query, [token]);
  
      res.status(200).json({ message: 'Token invalidated successfully' });
    } catch (error) {
      console.error('Error invalidating token:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };
  
  


}

export default AuthController;
