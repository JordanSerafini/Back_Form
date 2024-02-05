import Model from "../models/model";

class UserModel extends Model {
    static getUserByName(name: any) {
        throw new Error('Method not implemented.');
    }
    public id: number;
    public name: string;
    public fonction: string;
    public date: Date;

    constructor(id: number, name: string, fonction: string, date: Date) {
        super();
        this.id = id;
        this.name = name;
        this.fonction = fonction;
        this.date = date;
    }

    // Méthode pour insérer un user
    public static async insertUser(name: string, fonction: string, date: Date): Promise<void> {
        const sql = 'INSERT INTO user (name, fonction, date) VALUES (?, ?, ?)';
        try {
            await this.run(sql, [name, fonction, date]);
            console.log('Utilisateur inséré avec succès.');
        } catch (error) {
            console.error('Erreur lors de l\'insertion de l\'utilisateur:', error.message);
            throw error;
        }
    }

    // Méthode pour supprimer un utilisateur par son ID
    public static async deleteUserById(id: number): Promise<void> {
        const sql = 'DELETE FROM user WHERE id = ?';
        try {
            await this.run(sql, [id]);
            console.log(`Utilisateur avec l'ID ${id} supprimé avec succès.`);
        } catch (error) {
            console.error(`Erreur lors de la suppression de l'utilisateur avec l'ID ${id}:`, error.message);
            throw error;
        }
    }

}

export default UserModel;
