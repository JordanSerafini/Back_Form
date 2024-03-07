import Model from './model';

class TextareaModel extends Model {
  constructor() {
    super();
  }

  static async insertTextarea(title: string, response: string, formulaire_id: number): Promise<void> {
    const sql = `
      INSERT INTO Textarea (title, response, formulaire_id)
      VALUES ($1, $2, $3);
    `;
    const params = [title, response, formulaire_id];
    await this.run(sql, params);
  }
}

export default TextareaModel;
