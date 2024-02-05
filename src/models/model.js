"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sqlite3_1 = __importDefault(require("sqlite3"));
const databasePath = 'SLI-FORM.db';
class Model {
    constructor() { }
    static getDbInstance() {
        if (this.dbInstance) {
            return this.dbInstance;
        }
        this.dbInstance = new sqlite3_1.default.Database(databasePath, (err) => {
            if (err) {
                console.error('Erreur lors de l\'ouverture de la base de données SQLite:');
            }
            else {
                console.log('Base de données SQLite connectée avec succès.');
            }
        });
        return this.dbInstance;
    }
    static get(sql, params = []) {
        return new Promise((resolve, reject) => {
            this.getDbInstance().get(sql, params, (err, row) => {
                if (err) {
                    console.error('Erreur lors de l\'exécution de la requête SQL:');
                    reject(err);
                }
                else {
                    resolve(row);
                }
            });
        });
    }
    static all(sql, params = []) {
        return new Promise((resolve, reject) => {
            this.getDbInstance().all(sql, params, (err, rows) => {
                if (err) {
                    console.error('Erreur lors de l\'exécution de la requête SQL:', err.message);
                    reject(err);
                }
                else {
                    resolve(rows);
                }
            });
        });
    }
    static run(sql, params = []) {
        return new Promise((resolve, reject) => {
            this.getDbInstance().run(sql, params, function (err) {
                if (err) {
                    console.error("Erreur lors de l'exécution de la commande SQL:", err.message);
                    reject(err);
                }
                else {
                    console.log(`Commande SQL exécutée avec succès, RowID: ${this.lastID}`);
                    resolve();
                }
            });
        });
    }
}
exports.default = Model;
