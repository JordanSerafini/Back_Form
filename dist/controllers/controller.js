"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const commentModel_1 = __importDefault(require("../models/commentModel"));
const questionModel_1 = __importDefault(require("../models/questionModel"));
const userModel_1 = __importDefault(require("../models/userModel"));
class Controller {
    static insertData(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(process.env.DATABASE_URL);
            console.log(typeof process.env.DATABASE_URL);
            try {
                console.log("Requête reçue avec le corps :", req.body);
                // Récupérer les données depuis le corps de la requête
                const { user, questions, comments } = req.body;
                const { name, fonction, date } = user;
                yield userModel_1.default.insertUser(name, fonction, date);
                // Insérer l'utilisateur dans la base de données
                const userFounded = yield userModel_1.default.getUserByName(name);
                const userId = userFounded !== null ? userFounded.id : null;
                if (userId !== null) {
                    // Insérer les questions dans la base de données
                    for (const question of questions) {
                        const { formID, questionID, rating } = question;
                        yield questionModel_1.default.insertQuestion(formID, questionID, rating, userId);
                    }
                    // Insérer les commentaires dans la base de données
                    for (const comment of comments) {
                        const { formID, comment: commentText } = comment;
                        yield commentModel_1.default.insertComment(formID, commentText, userId);
                    }
                    res.status(200).json({
                        message: "Données insérées avec succès dans la base de données.",
                    });
                }
                else {
                    console.error("Erreur lors de l'insertion des données : userId est null.");
                    res.status(500).json({
                        error: "Erreur lors de l'insertion des données dans la base de données.",
                    });
                }
            }
            catch (error) {
                if (error instanceof Error) {
                    console.error("Erreur lors de l'insertion des données :", error.message);
                }
                else {
                    console.error("Erreur lors de l'insertion des données :", error);
                }
            }
        });
    }
}
exports.default = Controller;
//# sourceMappingURL=controller.js.map