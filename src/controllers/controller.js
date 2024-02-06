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
var commentModel_1 = require("../models/commentModel");
var questionModel_1 = require("../models/questionModel");
var userModel_1 = require("../models/userModel");
var Controller = /** @class */ (function () {
    function Controller() {
    }
    Controller.insertData = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, user, questions, comments, name_1, fonction, date, userFounded, userId, _i, questions_1, question, formID, questionID, rating, _b, comments_1, comment, formID, commentText, error_1;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        console.log(process.env.DATABASE_URL);
                        console.log(typeof process.env.DATABASE_URL);
                        _c.label = 1;
                    case 1:
                        _c.trys.push([1, 14, , 15]);
                        console.log("Requête reçue avec le corps :", req.body);
                        _a = req.body, user = _a.user, questions = _a.questions, comments = _a.comments;
                        name_1 = user.name, fonction = user.fonction, date = user.date;
                        return [4 /*yield*/, userModel_1.default.insertUser(name_1, fonction, date)];
                    case 2:
                        _c.sent();
                        return [4 /*yield*/, userModel_1.default.getUserByName(name_1)];
                    case 3:
                        userFounded = _c.sent();
                        userId = userFounded !== null ? userFounded.id : null;
                        if (!(userId !== null)) return [3 /*break*/, 12];
                        _i = 0, questions_1 = questions;
                        _c.label = 4;
                    case 4:
                        if (!(_i < questions_1.length)) return [3 /*break*/, 7];
                        question = questions_1[_i];
                        formID = question.formID, questionID = question.questionID, rating = question.rating;
                        return [4 /*yield*/, questionModel_1.default.insertQuestion(formID, questionID, rating, userId)];
                    case 5:
                        _c.sent();
                        _c.label = 6;
                    case 6:
                        _i++;
                        return [3 /*break*/, 4];
                    case 7:
                        _b = 0, comments_1 = comments;
                        _c.label = 8;
                    case 8:
                        if (!(_b < comments_1.length)) return [3 /*break*/, 11];
                        comment = comments_1[_b];
                        formID = comment.formID, commentText = comment.comment;
                        return [4 /*yield*/, commentModel_1.default.insertComment(formID, commentText, userId)];
                    case 9:
                        _c.sent();
                        _c.label = 10;
                    case 10:
                        _b++;
                        return [3 /*break*/, 8];
                    case 11:
                        res.status(200).json({
                            message: "Données insérées avec succès dans la base de données.",
                        });
                        return [3 /*break*/, 13];
                    case 12:
                        console.error("Erreur lors de l'insertion des données : userId est null.");
                        res.status(500).json({
                            error: "Erreur lors de l'insertion des données dans la base de données.",
                        });
                        _c.label = 13;
                    case 13: return [3 /*break*/, 15];
                    case 14:
                        error_1 = _c.sent();
                        if (error_1 instanceof Error) {
                            console.error("Erreur lors de l'insertion des données :", error_1.message);
                        }
                        else {
                            console.error("Erreur lors de l'insertion des données :", error_1);
                        }
                        return [3 /*break*/, 15];
                    case 15: return [2 /*return*/];
                }
            });
        });
    };
    return Controller;
}());
exports.default = Controller;
