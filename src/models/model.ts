import { Pool } from 'pg';

const pool = new Pool({
  connectionString: `${process.env.DATABASE_URL}`,
});

class Model {
  constructor() {}

  protected static async query(sql: string, params: any[] = []): Promise<any> {
    try {
      const { rows } = await pool.query(sql, params);
      return rows;
    } catch (err) {
      console.error('Erreur lors de l\'exécution de la requête SQL:', err.message);
      throw err;
    }
  }

  protected static async get(sql: string, params: any[] = []): Promise<any> {
    try {
      const { rows } = await pool.query(sql, params);
      return rows[0];
    } catch (err) {
      console.error('Erreur lors de l\'exécution de la requête SQL:', err.message);
      throw err;
    }
  }

  protected static async all(sql: string, params: any[] = []): Promise<any[]> {
    return this.query(sql, params);
  }

  protected static async run(sql: string, params: any[] = []): Promise<void> {
    try {
      await pool.query(sql, params);
      console.log(`Commande SQL exécutée avec succès`);
    } catch (err) {
      console.error("Erreur lors de l'exécution de la commande SQL:", err.message);
      throw err;
    }
  }
}

export default Model;
