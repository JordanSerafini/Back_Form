import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import sgMail from "@sendgrid/mail";
import bcrypt from "bcrypt";

const supportController = {
  sendForm: async (req: any, res: any, next: any) => {
    try {
    const { email } = req.body;
    console.log(email);

    // Générer un token JWT avec une durée de validité de 7 jours
    const token = jwt.sign({ email }, process.env.SECRET_KEY!, { expiresIn: '7d' });

    // Construire le lien d'accès à la page de formulaire avec le token inclus
    const formLink = `${process.env.FRONTEND_URL}/form-satisfaction?token=${token}`;

    // Envoyer l'e-mail contenant le lien d'accès à la page de formulaire
    sgMail.setApiKey(process.env.SENDGRID_API_KEY as string);
      const msg = {
        to: email,
        from: "immoprosoclock@gmail.com",
        subject: "Formulaire de satisfaction",
        text: `Bonjour, voici le lien vers notre formulaire de satisfaction, valable 7 jours : ${formLink}`,
      };
      sgMail
        .send(msg)
        .then(() => {
            console.log("Email envoyé");
          res.status(200).json("Email envoyé");
          
        })
        .catch((error) => {
          console.error(error);
          res.status(500).json("Erreur lors de l'envoi de l'e-mail");
        });
    } catch (error) {
      console.log(error);
      res.status(500).json("Erreur interne du serveur");
    }
  },
};

export default supportController;
