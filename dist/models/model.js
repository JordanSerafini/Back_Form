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
class Model {
    constructor() { }
    static query(sql, params = []) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { rows } = yield pool_1.pool.query(sql, params);
                return rows;
            }
            catch (err) { // Utilisez le type unknown ici.
                if (err instanceof Error) {
                    // Maintenant, TypeScript sait que err est une instance d'Error et possède une propriété message.
                    console.error('Erreur lors de l\'exécution de la requête SQL:', err.message);
                }
                else {
                    // Si ce n'est pas une instance d'Error, log un message générique.
                    console.error('Une erreur inconnue est survenue lors de l\'exécution de la requête SQL');
                }
                throw err;
            }
        });
    }
    static get(sql, params = []) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { rows } = yield pool_1.pool.query(sql, params);
                return rows[0];
            }
            catch (err) {
                if (err instanceof Error) {
                    console.error('Erreur lors de l\'exécution de la requête SQL:', err.message);
                }
                else {
                    console.error('Une erreur inconnue est survenue lors de l\'exécution de la requête SQL');
                }
                throw err;
            }
        });
    }
    static all(sql, params = []) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.query(sql, params);
        });
    }
    static run(sql, params = []) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield pool_1.pool.query(sql, params);
                console.log(`Commande SQL exécutée avec succès`);
            }
            catch (err) {
                if (err instanceof Error) {
                    console.error("Erreur lors de l'exécution de la commande SQL:", err.message);
                }
                else {
                    console.error("Une erreur inconnue est survenue lors de l'exécution de la commande SQL");
                }
                throw err;
            }
        });
    }
}
exports.default = Model;
//# sourceMappingURL=model.js.map