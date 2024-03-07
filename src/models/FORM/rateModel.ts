import Model from '../model';

class RateModel extends Model {
  constructor() {
    super();
  }

  static async insertRate(title: string, note: number, formulaire_id: number): Promise<void> {
    const sql = `
      INSERT INTO Rate (title, note, formulaire_id)
      VALUES ($1, $2, $3);
    `;
    const params = [title, note, formulaire_id];
    await this.run(sql, params);
  }
}

export default RateModel;
