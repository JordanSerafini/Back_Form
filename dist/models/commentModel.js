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
class CommentModel {
    constructor(id, formID, comment, userID) {
        this.id = id;
        this.formID = formID;
        this.comment = comment;
        this.userID = userID;
    }
    // Méthode pour insérer un commentaire
    static insertComment(formID, commentText, userID) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const sql = 'INSERT INTO comment (formID, comment, userID) VALUES ($1, $2, $3)';
            try {
                const res = yield pool_1.pool.query(sql, [formID, commentText, userID]);
                console.log('Commentaire inséré avec succès. ID:', (_a = res.rows[0]) === null || _a === void 0 ? void 0 : _a.id);
            }
            catch (error) {
                console.error('Erreur lors de l\'insertion du commentaire:', error.message);
                throw error;
            }
        });
    }
    // Méthode pour supprimer un commentaire par son ID
    static deleteCommentById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const sql = 'DELETE FROM comment WHERE id = $1';
            try {
                yield pool_1.pool.query(sql, [id]);
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
//# sourceMappingURL=commentModel.js.map