
function generatePostgresSchema(tableName, columns) {
  let createTableQuery = `CREATE TABLE ${tableName} (\n`;

  columns.forEach((column, index) => {
    let pgDataType = column.DATA_TYPE;
    switch(column.DATA_TYPE) {
      case 'nvarchar':
        pgDataType = `VARCHAR(${column.CHARACTER_MAXIMUM_LENGTH})`;
        break;
      case 'int':
        pgDataType = 'INTEGER';
        break;
      case 'varbinary':
        pgDataType = 'VARBINARY';
        break;
      case 'uniqueidentifier':
        pgDataType = 'UNIQUEIDENTIFIER';
        break;
      case 'decimal':
        pgDataType = 'DECIMAL';
        break;
      case 'tinyint':
        pgDataType = 'TINYINT';
        break;
      case 'datetime':
        pgDataType = 'DATETIME';
        break;
      case 'bit':
        pgDataType = 'BIT';
        break;
      default:
        throw new Error(`Type de données non géré : ${column.DATA_TYPE}`);
    }

    createTableQuery += `  ${column.COLUMN_NAME} ${pgDataType}`;
    if (column.IS_NULLABLE === 'NO') createTableQuery += ' NOT NULL';
    if (column.COLUMN_DEFAULT) createTableQuery += ` DEFAULT ${column.COLUMN_DEFAULT}`;
    if (index < columns.length - 1) createTableQuery += ',\n'; // Pas de virgule après la dernière colonne
  });

  createTableQuery += '\n);';

  return createTableQuery;
};



async function executeScriptsOnPostgres(scripts) {
  for (let script of scripts) {
    try {
      await pgPool.query(script);
      console.log("Script exécuté avec succès:");
      console.log(script);
    } catch (error) {
      console.error("Erreur lors de l'exécution du script:", error);
      console.error("Script en échec:", script);
      // Selon votre préférence, vous pouvez arrêter le processus ou continuer avec les autres scripts
    }
  }
}