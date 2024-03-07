import { Request, Response } from "express";
import CommentModel from "../../models/oldForm/commentModel";
import QuestionModel from "../../models/oldForm/questionModel";
import UserModel from "../../models/oldForm/userModel";

class Controller {
  
  public static async insertData(req: Request, res: Response): Promise<void> {
    //console.log(process.env.DATABASE_URL);
    //console.log(typeof process.env.DATABASE_URL);


    try {
      //console.log("Requête reçue avec le corps :", req.body);

      // Récupérer les données depuis le corps de la requête
      const { user, questions, comments } = req.body;

      const { name, fonction, date } = user;
      await UserModel.insertUser(name, fonction, date);
      
      // Insérer l'utilisateur dans la base de données
      const userFounded: UserModel | null = await UserModel.getUserByName(name);
      const userId: number | null =
        userFounded !== null ? (userFounded as UserModel).id : null;

        
      if (userId !== null) {
        // Insérer les questions dans la base de données
        for (const question of questions) {
          const { formID, questionID, rating } = question;
          await QuestionModel.insertQuestion(
            formID,
            questionID,
            rating,
            userId
          );
        }

        // Insérer les commentaires dans la base de données
        for (const comment of comments) {
          const { formID, comment: commentText } = comment;
          await CommentModel.insertComment(formID, commentText, userId);
        }

        res.status(200).json({
          message: "Données insérées avec succès dans la base de données.",
        });
      } else {
        console.error(
          "Erreur lors de l'insertion des données : userId est null."
        );
        res.status(500).json({
          error:
            "Erreur lors de l'insertion des données dans la base de données.",
        });
      }
    } catch (error) {
      if (error instanceof Error) {
        console.error(
          "Erreur lors de l'insertion des données :",
          error.message
        );
      } else {
        console.error("Erreur lors de l'insertion des données :", error);
      }
    }
  }

  public static async getData(req: Request, res: Response): Promise<void> {
    try {
      // Récupérer l'ID de l'utilisateur à partir des paramètres de requête
      const userId: number | undefined = parseInt(req.params.id, 10);
      //console.log(userId);

      if (isNaN(userId)) {
        res.status(400).json({ error: "L'ID de l'utilisateur est invalide." });
        return;
      }

      const userFounded: UserModel | null = await UserModel.getUserById(userId);

      if (userFounded) {
        const questions: QuestionModel[] | null = await QuestionModel.getQuestionsByUserId(userId);
        const comments: CommentModel[] | null = await CommentModel.getCommentsByUserId(userId);

        res.status(200).json({
          user: userFounded,
          questions,
          comments,
        });
      } else {
        console.error("Aucun utilisateur trouvé avec l'ID :", userId);
        res.status(404).json({
          error: "Utilisateur non trouvé dans la base de données.",
        });
      }
    } catch (error) {
      console.error("Erreur lors de la récupération des données :", error);

      res.status(500).json({
        error: "Erreur lors de la récupération des données dans la base de données.",
      });
    }
  }


}

export default Controller;
