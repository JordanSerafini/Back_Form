// Middleware de validation du token
import jwt from 'jsonwebtoken';

const isToken = (req: any, res:any, next:any) => {
  
  const token = req.query.token; 
  if (!token) return res.sendStatus(401); 

  const jwtSecret = process.env.SECRET_KEY; 
  if (!jwtSecret) return res.sendStatus(500); 

  jwt.verify(token, jwtSecret, (err: any, user:any) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next(); 
  });
};

export default isToken;
