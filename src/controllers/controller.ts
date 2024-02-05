import { Request, Response } from 'express';
import FormModel from "../models/Form"

class Controller {
    // Endpoint pour insérer un nouvel utilisateur
    public static async insertUser(req: Request, res: Response): Promise<void> {
        try {
            // Récupérez les données du corps de la requête (à adapter selon votre configuration)
            const { name, fonction, date } = req.body;

            // Vérifiez que toutes les données nécessaires sont présentes
            if (!name || !fonction || !date) {
                res.status(400).json({ error: 'Toutes les informations requises ne sont pas fournies.' });
                return;
            }

            // Insérez l'utilisateur dans la base de données en utilisant le modèle
            await UserModel.insertUser(name, fonction, date);

            // Réponse de réussite
            res.status(201).json({ message: 'Utilisateur ajouté avec succès.' });
        } catch (error) {
            // Gestion des erreurs
            console.error('Erreur lors de l\'insertion de l\'utilisateur:', error.message);
            res.status(500).json({ error: 'Une erreur s\'est produite lors de l\'insertion de l\'utilisateur.' });
        }
    }
}

export default Controller;
