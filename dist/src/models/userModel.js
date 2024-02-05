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
class UserModel extends model_1.default {
    constructor(id, name, fonction, date) {
        super();
        this.id = id;
        this.name = name;
        this.fonction = fonction;
        this.date = date;
    }
    // Méthode pour récupérer un utilisateur par son nom
    static getUserByName(name) {
        return __awaiter(this, void 0, void 0, function* () {
            const sql = 'SELECT * FROM user WHERE name = ?';
            try {
                const rows = yield this.all(sql, [name]);
                if (rows && rows.length > 0) {
                    const { id, name, fonction, date } = rows[0];
                    return new UserModel(id, name, fonction, date);
                }
                else {
                    return null;
                }
            }
            catch (error) {
                console.error('Erreur lors de la récupération de l\'utilisateur par nom:');
                throw error;
            }
        });
    }
    // Méthode pour insérer un utilisateur
    static insertUser(name, fonction, date) {
        return __awaiter(this, void 0, void 0, function* () {
            const sql = 'INSERT INTO user (name, fonction, date) VALUES (?, ?, ?)';
            try {
                yield this.run(sql, [name, fonction, date]);
                console.log('Utilisateur inséré avec succès.');
            }
            catch (error) {
                console.error('Erreur lors de l\'insertion de l\'utilisateur:');
                throw error;
            }
        });
    }
    // Méthode pour supprimer un utilisateur par son ID
    static deleteUserById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const sql = 'DELETE FROM user WHERE id = ?';
            try {
                yield this.run(sql, [id]);
                console.log(`Utilisateur avec l'ID ${id} supprimé avec succès.`);
            }
            catch (error) {
                console.error(`Erreur lors de la suppression de l'utilisateur avec l'ID ${id}:`);
                throw error;
            }
        });
    }
}
exports.default = UserModel;
