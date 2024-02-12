import { Pool } from 'pg';
import { createWriteStream } from 'fs';
import { format } from 'fast-csv';

// Paramètres de connexion à la base de données
const pool = new Pool({
    user: 'hpyllrbs',
    host: 'tai.db.elephantsql.com',
    database: 'hpyllrbs ',
    password: 'wTTx_RHv302SWMHU95MmDqYRtRpYQkUT',
    port: 5432,
    ssl: {
      rejectUnauthorized: false 
    }
  });

// Chemin du fichier CSV de sortie
const csvStream = format({ headers: true });
const writableStream = createWriteStream('./test.csv');

writableStream.on('finish', () => {
  console.log('Fait !');
});

csvStream.pipe(writableStream);

// Fonction asynchrone pour exporter les données
async function exportToCSV() {
  const client = await pool.connect();
  try {
    const query = 'SELECT * FROM votre_table'; // Remplacez "votre_table" par le nom de votre table
    const result = await client.query(query);
    const rows = result.rows;
    // Écriture des données dans le fichier CSV
    rows.forEach(row => {
      csvStream.write(row);
    });
  } catch (err) {
    console.error('Erreur lors de l\'exportation :');
  } finally {
    // Libération du client et fin du flux CSV
    client.release();
    csvStream.end();
  }
}

// Exécution de la fonction d'exportation
exportToCSV().catch((err) => console.error('Erreur d\'execution :', err));
