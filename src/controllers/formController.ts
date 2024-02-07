// Importations correctes
import * as jwt from 'jsonwebtoken';
import { Request, Response } from 'express';

const SECRET_KEY = process.env.SECRET_KEY ;

const formController = {
validateToken: (req: Request, res: Response) => {
    const token = req.query.token as string; // TypeScript typage explicite
    if (!token) {
        return res.status(400).json({ isValid: false, error: 'Token manquant' });
    }

    if (!SECRET_KEY) {
        return res.status(500).json({ isValid: false, error: 'Clé secrète manquante' });
    }

    jwt.verify(token, SECRET_KEY, (err, decoded) => {
        if (err) {
            return res.status(401).json({ isValid: false, error: 'Token invalide ou expiré' });
        }

        return res.json({ isValid: true, data: decoded });
    });
}
};

export default formController;
