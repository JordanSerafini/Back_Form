import { Client, QueryArrayConfig } from 'pg';

const pgClient = new Client({
  user: 'jordans',
  host: 'localhost',
  database: 'ebptest',
  password: ' ',
  port: 5432,
});

pgClient.connect()
  .then(() => console.log('Connected to PostgreSQL'))
  .catch((e: Error) => console.error('Connection to PostgreSQL failed', e));

const executeQuery = async (queryText: string, params: any[] = []) => {
  try {
    const res = await pgClient.query(queryText, params);
    return res.rows;
  } catch (err) {
    console.error('Error executing query', (err as Error).stack);
    throw err;
  }
};

export { pgClient, executeQuery };
