// Middleware de validation du token
const jwt = require('jsonwebtoken');

const isToken = (req: any, res:any, next:any) => {
  const token = req.query.token; // Extraire le token de l'URL
  if (!token) return res.sendStatus(401); // Token manquant

  jwt.verify(token, process.env.JWT_SECRET, (err: any, user:any) => {
    if (err) return res.sendStatus(403); // Token invalide
    req.user = user;
    next(); // Passer au middleware suivant
  });
};

export default isToken;
