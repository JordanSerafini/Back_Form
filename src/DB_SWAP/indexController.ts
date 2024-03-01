import { IRecordSet } from "mssql";
import client from "../database/client";

const indexController = {
    async listTables(_: any, res: { send: (arg0: IRecordSet<any>) => void; }) {
        try {
            await client.connectDatabase();

            const query = `SELECT TABLE_NAME FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_TYPE = 'BASE TABLE'`;

            const tables = await client.executeQuery(query);
            res.send(tables);
        } catch (err) {
            console.error("Une erreur est survenue :", err);
            throw err; // Propager l'erreur pour une gestion ultérieure si nécessaire
        }
    },

    async getTableSchema(tableName: any) {
        const query = `
            SELECT
                COLUMN_NAME,
                DATA_TYPE,
                CHARACTER_MAXIMUM_LENGTH,
                IS_NULLABLE,
                COLUMN_DEFAULT
            FROM
                INFORMATION_SCHEMA.COLUMNS
            WHERE
                TABLE_NAME = '${tableName}'`;

        try {
            const columns = await client.executeQuery(query);
            return columns;
        } catch (err) {
            console.error("Impossible de récupérer le schéma de la table :", err);
            throw err;
        }
    },

    async listTablesAndSchemas(): Promise<{ tableName: any; columns: IRecordSet<any>; }[]> {
        try {
            await client.connectDatabase();

            const tablesQuery = `SELECT TABLE_NAME FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_TYPE = 'BASE TABLE'`;
            const tables = await client.executeQuery(tablesQuery);

            const schemasPromises = tables.map(async (table: { TABLE_NAME: any; }) => {
                const schemaQuery = `
                    SELECT COLUMN_NAME, DATA_TYPE 
                    FROM INFORMATION_SCHEMA.COLUMNS 
                    WHERE TABLE_NAME = N'${table.TABLE_NAME}'`;
                const schemaInfo = await client.executeQuery(schemaQuery);
                return { tableName: table.TABLE_NAME, columns: schemaInfo };
            });

            const schemas = await Promise.all(schemasPromises);
            return schemas;
        } catch (err) {
            console.error("Une erreur est survenue :", err);
            throw err;
        }
    },

    
};

export default indexController;
