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
class UserModel {
    constructor(id, name, fonction, date) {
        this.id = id;
        this.name = name;
        this.fonction = fonction;
        this.date = date;
    }
    // Méthode pour récupérer un utilisateur par son nom
    static getUserByName(name) {
        return __awaiter(this, void 0, void 0, function* () {
            const sql = 'SELECT * FROM "user" WHERE name = $1';
            try {
                const { rows } = yield pool_1.pool.query(sql, [name]);
                if (rows.length > 0) {
                    const { id, name, fonction, date } = rows[0];
                    return new UserModel(id, name, fonction, new Date(date));
                }
                else {
                    return null;
                }
            }
            catch (error) { // Annoter l'erreur avec le type unknown
                if (error instanceof Error) {
                    console.error('Erreur lors de la récupération de l\'utilisateur par nom:', error.message);
                }
                else {
                    console.error('Une erreur inconnue est survenue lors de la récupération de l\'utilisateur par nom');
                }
                throw error;
            }
        });
    }
    // Méthode pour insérer un utilisateur
    static insertUser(name, fonction, date) {
        return __awaiter(this, void 0, void 0, function* () {
            const sql = 'INSERT INTO "user" (name, fonction, date) VALUES ($1, $2, $3)';
            try {
                yield pool_1.pool.query(sql, [name, fonction, date]);
                console.log('Utilisateur inséré avec succès.');
            }
            catch (error) { // Annoter l'erreur avec le type unknown
                if (error instanceof Error) {
                    console.error('Erreur lors de l\'insertion de l\'utilisateur:', error.message);
                }
                else {
                    console.error('Une erreur inconnue est survenue lors de l\'insertion de l\'utilisateur');
                }
                throw error;
            }
        });
    }
    // Méthode pour supprimer un utilisateur par son ID
    static deleteUserById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const sql = 'DELETE FROM "user" WHERE id = $1';
            try {
                yield pool_1.pool.query(sql, [id]);
                console.log(`Utilisateur avec l'ID ${id} supprimé avec succès.`);
            }
            catch (error) { // Annoter l'erreur avec le type unknown
                if (error instanceof Error) {
                    console.error(`Erreur lors de la suppression de l'utilisateur avec l'ID ${id}:`, error.message);
                }
                else {
                    console.error(`Une erreur inconnue est survenue lors de la suppression de l'utilisateur avec l'ID ${id}`);
                }
                throw error;
            }
        });
    }
}
exports.default = UserModel;
//# sourceMappingURL=userModel.js.map