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
var QuestionModel = /** @class */ (function () {
    function QuestionModel(id, formID, questionID, rating, userID) {
        this.id = id;
        this.formID = formID;
        this.questionID = questionID;
        this.rating = rating;
        this.userID = userID;
    }
    // Méthode pour insérer une question
    QuestionModel.insertQuestion = function (formID, questionID, rating, userID) {
        return __awaiter(this, void 0, void 0, function () {
            var sql, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        sql = 'INSERT INTO question (formID, questionID, rating, userID) VALUES ($1, $2, $3, $4)';
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, pool_1.pool.query(sql, [formID, questionID, rating, userID])];
                    case 2:
                        _a.sent();
                        console.log('Question insérée avec succès.');
                        return [3 /*break*/, 4];
                    case 3:
                        error_1 = _a.sent();
                        if (error_1 instanceof Error) {
                            console.error('Erreur lors de l\'insertion de la question:', error_1.message);
                        }
                        else {
                            console.error('Une erreur inconnue est survenue lors de l\'insertion de la question');
                        }
                        throw error_1;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    // Méthode pour supprimer une question par son ID
    QuestionModel.deleteQuestionById = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var sql, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        sql = 'DELETE FROM question WHERE id = $1';
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, pool_1.pool.query(sql, [id])];
                    case 2:
                        _a.sent();
                        console.log("Question avec l'ID ".concat(id, " supprim\u00E9e avec succ\u00E8s."));
                        return [3 /*break*/, 4];
                    case 3:
                        error_2 = _a.sent();
                        if (error_2 instanceof Error) {
                            console.error("Erreur lors de la suppression de la question avec l'ID ".concat(id, ":"), error_2.message);
                        }
                        else {
                            console.error("Une erreur inconnue est survenue lors de la suppression de la question avec l'ID ".concat(id));
                        }
                        throw error_2;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    return QuestionModel;
}());
exports.default = QuestionModel;
