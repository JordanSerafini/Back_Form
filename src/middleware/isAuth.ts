import jsonwebtoken from 'jsonwebtoken';

const isAuthMw = {
    isAuth (req: any, res: any, next: any)  {
        // Récupérer le token de l'en-tête Authorization
        const authHeader = req.headers.authorization;
        if (authHeader) {
          const token = authHeader.split(' ')[1];

          // Vérifier le token
          if (process.env.SECRET_KEY) {
            jsonwebtoken.verify(token, process.env.SECRET_KEY , (err: any, user: any) => {
              if (err) {
                return res.sendStatus(403); // Token invalide ou expiré
              }

              req.user = user; // Stocker les données utilisateur dans l'objet requête
              next(); // Passer au prochain middleware
            });
          } else {
            return res.sendStatus(500); // Clé secrète manquante
          }
        } else {
          return res.sendStatus(401); // Aucun token fourni
        }
    }
}

export default isAuthMw;
