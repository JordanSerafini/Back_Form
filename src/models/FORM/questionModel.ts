import Model from '../model';

class QuestionModel extends Model {
  constructor() {
    super();
  }

  static async insertQuestion(title: string, response: string, formulaire_id: number): Promise<void> {
    const sql = `
      INSERT INTO Questions (title, response, formulaire_id)
      VALUES ($1, $2, $3);
    `;
    const params = [title, response, formulaire_id];
    await this.run(sql, params);
  }
}

export default QuestionModel;
