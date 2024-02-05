import { Request, Response } from "express";
import CommentModel from "../models/commentModel";
import QuestionModel from "../models/questionModel";
import UserModel from "../models/userModel";

class Controller {
  public static async insertData(req: Request, res: Response): Promise<void> {
    try {
      // Récupérer les données depuis le corps de la requête
      const { name, fonction, date, questions, comments } = req.body;

      // Insérer l'utilisateur dans la base de données
      await UserModel.insertUser(name, fonction, date);

      // Récupérer l'ID de l'utilisateur inséré
      const user: UserModel | null = await UserModel.getUserByName(name);
      const userId: number | null = user !== null ? user.id : null;

      if (userId !== null) {
        // Insérer les questions dans la base de données
        for (const question of questions) {
          const { formID, questionID, rating } = question;
          await QuestionModel.insertQuestion(formID, questionID, rating, userId);
        }

        // Insérer les commentaires dans la base de données
        for (const comment of comments) {
          const { formID, comment: commentText } = comment;
          await CommentModel.insertComment(formID, commentText, userId);
        }

        res
          .status(200)
          .json({
            message: "Données insérées avec succès dans la base de données.",
          });
      } else {
        console.error("Erreur lors de l'insertion des données : userId est null.");
        res
          .status(500)
          .json({
            error:
              "Erreur lors de l'insertion des données dans la base de données.",
          });
      }
    } catch (error) {
      console.error("Erreur lors de l'insertion des données :", error.message);
      res
        .status(500)
        .json({
          error:
            "Erreur lors de l'insertion des données dans la base de données.",
        });
    }
  }
}

export default Controller;
