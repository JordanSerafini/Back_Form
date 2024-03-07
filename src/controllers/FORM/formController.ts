import { Request, Response } from 'express';
import FormulaireModel from '../../models/FORM/formulaireModel'
import QuestionModel from '../../models/FORM/questionModel';
import TextareaModel from '../../models/FORM/textareaModel';
import RateModel from '../../models/FORM/rateModel';


import {formPool} from "../../database/FORM/formPool" 

const formController = {
    createFormulaire: async (req: Request, res: Response) => {
        console.log(req.body)
        try {
          // Récupérer les données du formulaire depuis la requête
          const { nom_formulaire, nom_client, commercial_id, data } = req.body;
      
          // Vérifier si les données sont correctement définies
          if (!data || !Array.isArray(data) || data.length === 0) {
            throw new Error('Aucune donnée valide fournie');
          }
      
          // Diviser les données en questions, textareas et rates
          console.log(data[0])
          const { questions, textareas, rates } = data[0]; 
      
          // Créer un nouveau formulaire dans la base de données
          const nouveauFormulaire = await FormulaireModel.insertFormulaire(nom_formulaire, nom_client, commercial_id);
      
          // Pour chaque question, créer un enregistrement dans la table Questions
          if (questions && Array.isArray(questions)) {
            await Promise.all(questions.map(async (question: any) => {
              await QuestionModel.insertQuestion(question.title, question.response, nouveauFormulaire.id);
            }));
          }
      
          // Pour chaque textarea, créer un enregistrement dans la table Textarea
          if (textareas && Array.isArray(textareas)) {
            await Promise.all(textareas.map(async (textarea: any) => {
              await TextareaModel.insertTextarea(textarea.title, textarea.response, nouveauFormulaire.id);
            }));
          }
      
          // Pour chaque rate, créer un enregistrement dans la table Rate
          if (rates && Array.isArray(rates)) {
            await Promise.all(rates.map(async (rate: any) => {
              await RateModel.insertRate(rate.title, rate.note, nouveauFormulaire.id);
            }));
          }
      
          // Répondre avec succès
          res.status(201).json({ message: 'Formulaire créé avec succès' });
        } catch (error) {
          console.error('Erreur lors de la création du formulaire :', error);
          res.status(500).json({ error: 'Erreur lors de la création du formulaire' });
        }
      },
      
  };
  
  
  export default formController;