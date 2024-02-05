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
const model_1 = __importDefault(require("../models/model"));
class CommentModel extends model_1.default {
    constructor(id, formID, comment, userID) {
        super();
        this.id = id;
        this.formID = formID;
        this.comment = comment;
        this.userID = userID;
    }
    // Méthode pour insérer un commentaire
    static insertComment(formID, commentText, userID) {
        return __awaiter(this, void 0, void 0, function* () {
            const sql = 'INSERT INTO comment (formID, comment, userID) VALUES (?, ?, ?)';
            try {
                yield this.run(sql, [formID, commentText, userID]);
                console.log('Commentaire inséré avec succès.');
            }
            catch (error) {
                console.error('Erreur lors de l\'insertion du commentaire:', error.message);
                throw error;
            }
        });
    }
    static deleteCommentById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const sql = 'DELETE FROM comment WHERE id = ?';
            try {
                yield this.run(sql, [id]);
                console.log(`Commentaire avec l'ID ${id} supprimé avec succès.`);
            }
            catch (error) {
                console.error(`Erreur lors de la suppression du commentaire avec l'ID ${id}:`, error.message);
                throw error;
            }
        });
    }
}
exports.default = CommentModel;
