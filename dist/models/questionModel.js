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
Object.defineProperty(exports, "__esModule", { value: true });
const pool_1 = require("../database/pool");
class QuestionModel {
    constructor(id, formID, questionID, rating, userID) {
        this.id = id;
        this.formID = formID;
        this.questionID = questionID;
        this.rating = rating;
        this.userID = userID;
    }
    // Méthode pour insérer une question
    static insertQuestion(formID, questionID, rating, userID) {
        return __awaiter(this, void 0, void 0, function* () {
            const sql = 'INSERT INTO question (formID, questionID, rating, userID) VALUES ($1, $2, $3, $4)';
            try {
                yield pool_1.pool.query(sql, [formID, questionID, rating, userID]);
                console.log('Question insérée avec succès.');
            }
            catch (error) { // Utilisez unknown comme type d'erreur.
                if (error instanceof Error) {
                    console.error('Erreur lors de l\'insertion de la question:', error.message);
                }
                else {
                    console.error('Une erreur inconnue est survenue lors de l\'insertion de la question');
                }
                throw error;
            }
        });
    }
    // Méthode pour supprimer une question par son ID
    static deleteQuestionById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const sql = 'DELETE FROM question WHERE id = $1';
            try {
                yield pool_1.pool.query(sql, [id]);
                console.log(`Question avec l'ID ${id} supprimée avec succès.`);
            }
            catch (error) {
                if (error instanceof Error) {
                    console.error(`Erreur lors de la suppression de la question avec l'ID ${id}:`, error.message);
                }
                else {
                    console.error(`Une erreur inconnue est survenue lors de la suppression de la question avec l'ID ${id}`);
                }
                throw error;
            }
        });
    }
}
exports.default = QuestionModel;
//# sourceMappingURL=questionModel.js.map