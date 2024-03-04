import { pgClient } from "../database/clientPGlocal"; // client PG de destination


interface Column {
  DATA_TYPE: string;
  CHARACTER_MAXIMUM_LENGTH?: number;
  COLUMN_NAME: string;
  IS_NULLABLE: string;
  COLUMN_DEFAULT?: any;
}

export function generatePostgresSchema(
  tableName: string,
  columns: Column[]
): string {
  const createTableQuery =
    `CREATE TABLE "${tableName}" (\n` +
    columns
      .map((column, index) => {
        let pgDataType: string;

        switch (column.DATA_TYPE) {
          case "nvarchar":
            pgDataType = `TEXT`;
            break;
          case "varchar":
            pgDataType = `TEXT`;
            break;
          case "int":
            pgDataType = "INTEGER";
            break;
          case "varbinary":
            pgDataType = "BYTEA";
            break;
          case "uniqueidentifier":
            pgDataType = "UUID";
            break;
          case "decimal":
            pgDataType = "DECIMAL";
            break;
          case "tinyint":
            pgDataType = "SMALLINT";
            break;
          case "smallint":
            pgDataType = "SMALLINT";
            break;
          case "datetime":
            pgDataType = "TIMESTAMP";
            break;
          case "bit":
            pgDataType = "BIT(1)";
            break;
          case "float":
            pgDataType = "REAL";
            break;
          case "nchar":
            pgDataType = "TEXT";
            break;
          default:
            pgDataType = "TEXT";
            throw new Error(`Type de données non géré : ${column.DATA_TYPE}`);
        }

        let columnDefinition = `  ${column.COLUMN_NAME} ${pgDataType}`;
        if (column.IS_NULLABLE === "NO") columnDefinition += " NOT NULL";
        if (column.COLUMN_DEFAULT)
          columnDefinition += ` DEFAULT ${column.COLUMN_DEFAULT}`;
        return columnDefinition + (index < columns.length - 1 ? "," : ""); // Ajouter une virgule sauf pour la dernière colonne
      })
      .join("\n") +
    "\n);";

  return createTableQuery;
}

export async function executeScriptsOnPostgres(scripts: string[]): Promise<void> {
  for (const script of scripts) {
    try {
      await pgClient.query(script);
      console.log("Script exécuté avec succès:");
      console.log(script);
    } catch (error) {
      console.error("Erreur lors de l'exécution du script:", error);
      console.error("Script en échec:", script);
    }
  }
}
