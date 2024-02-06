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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var pool_1 = require("../database/pool");
var UserModel = /** @class */ (function () {
    function UserModel(id, name, fonction, date) {
        this.id = id;
        this.name = name;
        this.fonction = fonction;
        this.date = date;
    }
    // Méthode pour récupérer un utilisateur par son nom
    UserModel.getUserByName = function (name) {
        return __awaiter(this, void 0, void 0, function () {
            var sql, rows, _a, id, name_1, fonction, date, error_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        sql = 'SELECT * FROM "user" WHERE name = $1';
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, pool_1.pool.query(sql, [name])];
                    case 2:
                        rows = (_b.sent()).rows;
                        if (rows.length > 0) {
                            _a = rows[0], id = _a.id, name_1 = _a.name, fonction = _a.fonction, date = _a.date;
                            return [2 /*return*/, new UserModel(id, name_1, fonction, new Date(date))];
                        }
                        else {
                            return [2 /*return*/, null];
                        }
                        return [3 /*break*/, 4];
                    case 3:
                        error_1 = _b.sent();
                        if (error_1 instanceof Error) {
                            console.error('Erreur lors de la récupération de l\'utilisateur par nom:', error_1.message);
                        }
                        else {
                            console.error('Une erreur inconnue est survenue lors de la récupération de l\'utilisateur par nom');
                        }
                        throw error_1;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    // Méthode pour insérer un utilisateur
    UserModel.insertUser = function (name, fonction, date) {
        return __awaiter(this, void 0, void 0, function () {
            var sql, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        sql = 'INSERT INTO "user" (name, fonction, date) VALUES ($1, $2, $3)';
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, pool_1.pool.query(sql, [name, fonction, date])];
                    case 2:
                        _a.sent();
                        console.log('Utilisateur inséré avec succès.');
                        return [3 /*break*/, 4];
                    case 3:
                        error_2 = _a.sent();
                        if (error_2 instanceof Error) {
                            console.error('Erreur lors de l\'insertion de l\'utilisateur:', error_2.message);
                        }
                        else {
                            console.error('Une erreur inconnue est survenue lors de l\'insertion de l\'utilisateur');
                        }
                        throw error_2;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    // Méthode pour supprimer un utilisateur par son ID
    UserModel.deleteUserById = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var sql, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        sql = 'DELETE FROM "user" WHERE id = $1';
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, pool_1.pool.query(sql, [id])];
                    case 2:
                        _a.sent();
                        console.log("Utilisateur avec l'ID ".concat(id, " supprim\u00E9 avec succ\u00E8s."));
                        return [3 /*break*/, 4];
                    case 3:
                        error_3 = _a.sent();
                        if (error_3 instanceof Error) {
                            console.error("Erreur lors de la suppression de l'utilisateur avec l'ID ".concat(id, ":"), error_3.message);
                        }
                        else {
                            console.error("Une erreur inconnue est survenue lors de la suppression de l'utilisateur avec l'ID ".concat(id));
                        }
                        throw error_3;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    return UserModel;
}());
exports.default = UserModel;
