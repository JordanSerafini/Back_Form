import { Pool } from 'pg';
import * as dotenv from 'dotenv';

dotenv.config();

export const pool = new Pool({
  connectionString: process.env.BARRACHIN_URL,
}
  );

//   connectionString: process.env.DATABASE_URL,
//   connectionString: process.env.BARRACHIN_URL,


