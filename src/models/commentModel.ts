import Model from "../models/model";

class CommentModel extends Model {
    public id: number;
    public formID: number;
    public comment: string;
    public userID: number;

    constructor(id: number, formID: number, comment: string, userID: number) {
        super();
        this.id = id;
        this.formID = formID;
        this.comment = comment;
        this.userID = userID;
    }

    // Méthode pour insérer un commentaire
    public static async insertComment(formID: number, comment: string, userID: number): Promise<void> {
        const sql = 'INSERT INTO comment (formID, comment, userID) VALUES (?, ?, ?)';
        try {
            await this.run(sql, [formID, comment, userID]);
            console.log('Commentaire inséré avec succès.');
        } catch (error) {
            console.error('Erreur lors de l\'insertion du commentaire:', error.message);
            throw error;
        }
    }

    // Méthode pour supprimer un commentaire par son ID
    public static async deleteCommentById(id: number): Promise<void> {
        const sql = 'DELETE FROM comment WHERE id = ?';
        try {
            await this.run(sql, [id]);
            console.log(`Commentaire avec l'ID ${id} supprimé avec succès.`);
        } catch (error) {
            console.error(`Erreur lors de la suppression du commentaire avec l'ID ${id}:`, error.message);
            throw error;
        }
    }

}

export default CommentModel;
