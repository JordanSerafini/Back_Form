// Middleware de validation du token
import jwt from 'jsonwebtoken';

const isToken = (req: any, res:any, next:any) => {
  const token = req.query.token; // Extraire le token de l'URL
  if (!token) return res.sendStatus(401); // Token manquant

  const jwtSecret = process.env.SECRET_KEY; // Get the JWT secret from environment variable
  if (!jwtSecret) return res.sendStatus(500); // JWT secret is not defined

  jwt.verify(token, jwtSecret, (err: any, user:any) => {
    if (err) return res.sendStatus(403); // Token invalide
    req.user = user;
    next(); // Passer au middleware suivant
  });
};

export default isToken;
