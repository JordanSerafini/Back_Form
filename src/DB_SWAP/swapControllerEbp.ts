import { pool } from "../database/client/pool";
import client from "../database/client/client";
import indexController from "./indexController";
import {
  executeScriptsOnPostgres,
  generatePostgresSchema,
} from "./functionEbp";

interface TableAndColumns {
  tableName: string;
  columns: {
    COLUMN_NAME: string;
    DATA_TYPE: string;
    CHARACTER_MAXIMUM_LENGTH: number;
    IS_NULLABLE: string;
    COLUMN_DEFAULT: any;
  }[];
}

const swapEbpController = {
  // Fonction principale pour démarrer la migration
  async migrateDatabase() {
    try {
      await client.connectDatabase();

      // Lister les tables et leurs schémas
      const tablesAndSchemas: TableAndColumns[] =
        await indexController.listTablesAndSchemas();

      for (const { tableName, columns } of tablesAndSchemas) {
        // Générer le script de création de table PostgreSQL
        const createTableScript = generatePostgresSchema(tableName, columns);

        // Exécuter le script de création de table PostgreSQL
        await executeScriptsOnPostgres([createTableScript]);
      }

      console.log("Migration terminée avec succès.");
    } catch (error) {
      console.error("Erreur lors de la migration:", error);
      throw error; // Propager l'erreur A AMELIORER
    } finally {
      await pool.end();
    }
  },

  async getAndInsertItem() {
    try {
      await client.connectDatabase();
      const query = "SELECT * FROM Item";
      const result = await client.executeQuery(query);

      const poolClient = await pool.connect();

      try {
        await poolClient.query("BEGIN");

        for (const item of result) {
          const columns = Object.keys(item).join(", ");
          const values = Object.values(item).map((value) => {
            if (typeof value === "boolean") {
              return value ? "1" : "0"; // Convertit true en '1' et false en '0' pour les champs BIT
            }
            return value;
          });

          const placeholders = values
            .map((_, index) => `$${index + 1}`)
            .join(", ");

          // Affiche les valeurs pour le débogage
          console.log("columns:", columns);
          console.log("values:", values);
          console.log("placeholders:", placeholders);

          const insertQuery = `INSERT INTO "Item" (${columns}) VALUES (${placeholders})`;

          try {
            await poolClient.query(insertQuery, values);
          } catch (error) {
            console.error(
              "Erreur d'insertion pour l'item:",
              item,
              "Erreur:",
              error
            );
            break;
          }
        }

        await poolClient.query("COMMIT");
        console.log(
          "Tous les items ont été insérés avec succès dans la base de données cible."
        );
      } catch (error) {
        await poolClient.query("ROLLBACK");
        console.error("Erreur lors de l'insertion des items:", error);
      } finally {
        poolClient.release();
      }
    } catch (error) {
      console.error(
        "Erreur lors de la récupération ou de l'insertion des items:",
        error
      );
    }
  },

  async getAndInsertStockItem() {
    try {
      await client.connectDatabase();
      const query = "SELECT * FROM StockItem";
      const result = await client.executeQuery(query);

      const poolClient = await pool.connect();

      try {
        await poolClient.query("BEGIN");

        for (const item of result) {
          const columns = Object.keys(item).join(", ");
          const values = Object.values(item).map((value) => {
            if (typeof value === "boolean") {
              return value ? "1" : "0"; // Convertit true en '1' et false en '0' pour les champs BIT
            }
            return value;
          });

          const placeholders = values
            .map((_, index) => `$${index + 1}`)
            .join(", ");

          // Affiche les valeurs pour le débogage
          console.log("columns:", columns);
          console.log("values:", values);
          console.log("placeholders:", placeholders);

          const insertQuery = `INSERT INTO "StockItem" (${columns}) VALUES (${placeholders})`;

          try {
            await poolClient.query(insertQuery, values);
          } catch (error) {
            console.error(
              "Erreur d'insertion pour l'item:",
              item,
              "Erreur:",
              error
            );
            break;
          }
        }

        await poolClient.query("COMMIT");
        console.log(
          "Tous les items ont été insérés avec succès dans la base de données cible."
        );
      } catch (error) {
        await poolClient.query("ROLLBACK");
        console.error("Erreur lors de l'insertion des items:", error);
      } finally {
        poolClient.release();
      }
    } catch (error) {
      console.error(
        "Erreur lors de la récupération ou de l'insertion des items:",
        error
      );
    }
  },

  async getAndInsertCustomer() {
    try {
      await client.connectDatabase();
      const query = "SELECT * FROM Customer";
      const result = await client.executeQuery(query);

      const poolClient = await pool.connect();

      try {
        await poolClient.query("BEGIN");

        for (const item of result) {
          const columns = Object.keys(item).join(", ");
          const values = Object.values(item).map((value) => {
            if (typeof value === "boolean") {
              return value ? "1" : "0"; // Convertit true en '1' et false en '0' pour les champs BIT
            }
            return value;
          });

          const placeholders = values
            .map((_, index) => `$${index + 1}`)
            .join(", ");

          // Affiche les valeurs pour le débogage
          console.log("columns:", columns);
          console.log("values:", values);
          console.log("placeholders:", placeholders);

          const insertQuery = `INSERT INTO "Customer" (${columns}) VALUES (${placeholders})`;

          try {
            await poolClient.query(insertQuery, values);
          } catch (error) {
            console.error(
              "Erreur d'insertion pour l'item:",
              item,
              "Erreur:",
              error
            );
            break;
          }
        }

        await poolClient.query("COMMIT");
        console.log(
          "Tous les items ont été insérés avec succès dans la base de données cible."
        );
      } catch (error) {
        await poolClient.query("ROLLBACK");
        console.error("Erreur lors de l'insertion des items:", error);
      } finally {
        poolClient.release();
      }
    } catch (error) {
      console.error(
        "Erreur lors de la récupération ou de l'insertion des items:",
        error
      );
    }
  },

  async getAndInsertSupplier() {
    try {
      await client.connectDatabase();
      const query = "SELECT * FROM Supplier";
      const result = await client.executeQuery(query);

      const poolClient = await pool.connect();

      try {
        await poolClient.query("BEGIN");

        for (const item of result) {
          const columns = Object.keys(item).join(", ");
          const values = Object.values(item).map((value) => {
            if (typeof value === "boolean") {
              return value ? "1" : "0"; // Convertit true en '1' et false en '0' pour les champs BIT
            }
            return value;
          });

          const placeholders = values
            .map((_, index) => `$${index + 1}`)
            .join(", ");

          // Affiche les valeurs pour le débogage
          console.log("columns:", columns);
          console.log("values:", values);
          console.log("placeholders:", placeholders);

          const insertQuery = `INSERT INTO "Supplier" (${columns}) VALUES (${placeholders})`;

          try {
            await poolClient.query(insertQuery, values);
          } catch (error) {
            console.error(
              "Erreur d'insertion pour l'item:",
              item,
              "Erreur:",
              error
            );
            break;
          }
        }

        await poolClient.query("COMMIT");
        console.log(
          "Tous les items ont été insérés avec succès dans la base de données cible."
        );
      } catch (error) {
        await poolClient.query("ROLLBACK");
        console.error("Erreur lors de l'insertion des items:", error);
      } finally {
        poolClient.release();
      }
    } catch (error) {
      console.error(
        "Erreur lors de la récupération ou de l'insertion des items:",
        error
      );
    }
  },

  async getAndInsertSupplierFamily() {
    try {
      await client.connectDatabase();
      const query = "SELECT * FROM SupplierFamily";
      const result = await client.executeQuery(query);

      const poolClient = await pool.connect();

      try {
        await poolClient.query("BEGIN");

        for (const item of result) {
          const columns = Object.keys(item).join(", ");
          const values = Object.values(item).map((value) => {
            if (typeof value === "boolean") {
              return value ? "1" : "0"; // Convertit true en '1' et false en '0' pour les champs BIT
            }
            return value;
          });

          const placeholders = values
            .map((_, index) => `$${index + 1}`)
            .join(", ");

          // Affiche les valeurs pour le débogage
          console.log("columns:", columns);
          console.log("values:", values);
          console.log("placeholders:", placeholders);

          const insertQuery = `INSERT INTO "SupplierFamily" (${columns}) VALUES (${placeholders})`;

          try {
            await poolClient.query(insertQuery, values);
          } catch (error) {
            console.error(
              "Erreur d'insertion pour l'item:",
              item,
              "Erreur:",
              error
            );
            break;
          }
        }

        await poolClient.query("COMMIT");
        console.log(
          "Tous les items ont été insérés avec succès dans la base de données cible."
        );
      } catch (error) {
        await poolClient.query("ROLLBACK");
        console.error("Erreur lors de l'insertion des items:", error);
      } finally {
        poolClient.release();
      }
    } catch (error) {
      console.error(
        "Erreur lors de la récupération ou de l'insertion des items:",
        error
      );
    }
  },

  async getAndInsertCustomerFamily() {
    try {
      await client.connectDatabase();
      const query = "SELECT * FROM CustomerFamily";
      const result = await client.executeQuery(query);

      const poolClient = await pool.connect();

      try {
        await poolClient.query("BEGIN");

        for (const item of result) {
          const columns = Object.keys(item).join(", ");
          const values = Object.values(item).map((value) => {
            if (typeof value === "boolean") {
              return value ? "1" : "0"; // Convertit true en '1' et false en '0' pour les champs BIT
            }
            return value;
          });

          const placeholders = values
            .map((_, index) => `$${index + 1}`)
            .join(", ");

          // Affiche les valeurs pour le débogage
          console.log("columns:", columns);
          console.log("values:", values);
          console.log("placeholders:", placeholders);

          const insertQuery = `INSERT INTO "CustomerFamily" (${columns}) VALUES (${placeholders})`;

          try {
            await poolClient.query(insertQuery, values);
          } catch (error) {
            console.error(
              "Erreur d'insertion pour l'item:",
              item,
              "Erreur:",
              error
            );
            break;
          }
        }

        await poolClient.query("COMMIT");
        console.log(
          "Tous les items ont été insérés avec succès dans la base de données cible."
        );
      } catch (error) {
        await poolClient.query("ROLLBACK");
        console.error("Erreur lors de l'insertion des items:", error);
      } finally {
        poolClient.release();
      }
    } catch (error) {
      console.error(
        "Erreur lors de la récupération ou de l'insertion des items:",
        error
      );
    }
  },

  async getAndInsertAddress() {
    try {
      await client.connectDatabase();
      const query = "SELECT * FROM Address";
      const result = await client.executeQuery(query);

      const poolClient = await pool.connect();

      try {
        await poolClient.query("BEGIN");

        for (const item of result) {
          const columns = Object.keys(item).join(", ");
          const values = Object.values(item).map((value) => {
            if (typeof value === "boolean") {
              return value ? "1" : "0"; // Convertit true en '1' et false en '0' pour les champs BIT
            }
            return value;
          });

          const placeholders = values
            .map((_, index) => `$${index + 1}`)
            .join(", ");

          // Affiche les valeurs pour le débogage
          console.log("columns:", columns);
          console.log("values:", values);
          console.log("placeholders:", placeholders);

          const insertQuery = `INSERT INTO "Address" (${columns}) VALUES (${placeholders})`;

          try {
            await poolClient.query(insertQuery, values);
          } catch (error) {
            console.error(
              "Erreur d'insertion pour l'item:",
              item,
              "Erreur:",
              error
            );
            break;
          }
        }

        await poolClient.query("COMMIT");
        console.log(
          "Tous les items ont été insérés avec succès dans la base de données cible."
        );
      } catch (error) {
        await poolClient.query("ROLLBACK");
        console.error("Erreur lors de l'insertion des items:", error);
      } finally {
        poolClient.release();
      }
    } catch (error) {
      console.error(
        "Erreur lors de la récupération ou de l'insertion des items:",
        error
      );
    }
  },

  async getAndInsertStockMovement() {
    try {
      await client.connectDatabase();
      const query = "SELECT * FROM StockMovement";
      const result = await client.executeQuery(query);

      const poolClient = await pool.connect();

      try {
        await poolClient.query("BEGIN");

        for (const item of result) {
          const columns = Object.keys(item).join(", ");
          const values = Object.values(item).map((value) => {
            if (typeof value === "boolean") {
              return value ? "1" : "0"; // Convertit true en '1' et false en '0' pour les champs BIT
            }
            return value;
          });

          const placeholders = values
            .map((_, index) => `$${index + 1}`)
            .join(", ");

          // Affiche les valeurs pour le débogage
          console.log("columns:", columns);
          console.log("values:", values);
          console.log("placeholders:", placeholders);

          const insertQuery = `INSERT INTO "StockMovement" (${columns}) VALUES (${placeholders})`;

          try {
            await poolClient.query(insertQuery, values);
          } catch (error) {
            console.error(
              "Erreur d'insertion pour l'item:",
              item,
              "Erreur:",
              error
            );
            break;
          }
        }

        await poolClient.query("COMMIT");
        console.log(
          "Tous les items ont été insérés avec succès dans la base de données cible."
        );
      } catch (error) {
        await poolClient.query("ROLLBACK");
        console.error("Erreur lors de l'insertion des items:", error);
      } finally {
        poolClient.release();
      }
    } catch (error) {
      console.error(
        "Erreur lors de la récupération ou de l'insertion des items:",
        error
      );
    }
  },

  async getAndInsertCustomerProduct() {
    try {
      await client.connectDatabase();
      const query = "SELECT * FROM CustomerProduct";
      const result = await client.executeQuery(query);

      const poolClient = await pool.connect();

      try {
        await poolClient.query("BEGIN");

        for (const item of result) {
          const columns = Object.keys(item).join(", ");
          const values = Object.values(item).map((value) => {
            if (typeof value === "boolean") {
              return value ? "1" : "0"; // Convertit true en '1' et false en '0' pour les champs BIT
            }
            return value;
          });

          const placeholders = values
            .map((_, index) => `$${index + 1}`)
            .join(", ");

          // Affiche les valeurs pour le débogage
          console.log("columns:", columns);
          console.log("values:", values);
          console.log("placeholders:", placeholders);

          const insertQuery = `INSERT INTO "CustomerProduct" (${columns}) VALUES (${placeholders})`;

          try {
            await poolClient.query(insertQuery, values);
          } catch (error) {
            console.error(
              "Erreur d'insertion pour l'item:",
              item,
              "Erreur:",
              error
            );
            break;
          }
        }

        await poolClient.query("COMMIT");
        console.log(
          "Tous les items ont été insérés avec succès dans la base de données cible."
        );
      } catch (error) {
        await poolClient.query("ROLLBACK");
        console.error("Erreur lors de l'insertion des items:", error);
      } finally {
        poolClient.release();
      }
    } catch (error) {
      console.error(
        "Erreur lors de la récupération ou de l'insertion des items:",
        error
      );
    }
  },

  async getAndInsertScheduleEvent() {
    try {
      await client.connectDatabase();
      const query = "SELECT * FROM ScheduleEvent";
      const result = await client.executeQuery(query);

      const poolClient = await pool.connect();

      try {
        await poolClient.query("BEGIN");

        for (const item of result) {
          const columns = Object.keys(item).join(", ");
          const values = Object.values(item).map((value) => {
            if (typeof value === "boolean") {
              return value ? "1" : "0"; // Convertit true en '1' et false en '0' pour les champs BIT
            }
            return value;
          });

          const placeholders = values
            .map((_, index) => `$${index + 1}`)
            .join(", ");

          // Affiche les valeurs pour le débogage
          console.log("columns:", columns);
          console.log("values:", values);
          console.log("placeholders:", placeholders);

          const insertQuery = `INSERT INTO "ScheduleEvent" (${columns}) VALUES (${placeholders})`;

          try {
            await poolClient.query(insertQuery, values);
          } catch (error) {
            console.error(
              "Erreur d'insertion pour l'item:",
              item,
              "Erreur:",
              error
            );
            break;
          }
        }

        await poolClient.query("COMMIT");
        console.log(
          "Tous les items ont été insérés avec succès dans la base de données cible."
        );
      } catch (error) {
        await poolClient.query("ROLLBACK");
        console.error("Erreur lors de l'insertion des items:", error);
      } finally {
        poolClient.release();
      }
    } catch (error) {
      console.error(
        "Erreur lors de la récupération ou de l'insertion des items:",
        error
      );
    }
  },

  async getAndInsertItemFamily() {
    try {
      await client.connectDatabase();
      const query = "SELECT * FROM ItemFamily";
      const result = await client.executeQuery(query);

      const poolClient = await pool.connect();

      try {
        await poolClient.query("BEGIN");

        for (const item of result) {
          const columns = Object.keys(item).join(", ");
          const values = Object.values(item).map((value) => {
            if (typeof value === "boolean") {
              return value ? "1" : "0"; // Convertit true en '1' et false en '0' pour les champs BIT
            }
            return value;
          });

          const placeholders = values
            .map((_, index) => `$${index + 1}`)
            .join(", ");

          // Affiche les valeurs pour le débogage
          console.log("columns:", columns);
          console.log("values:", values);
          console.log("placeholders:", placeholders);

          const insertQuery = `INSERT INTO "ItemFamily" (${columns}) VALUES (${placeholders})`;

          try {
            await poolClient.query(insertQuery, values);
          } catch (error) {
            console.error(
              "Erreur d'insertion pour l'item:",
              item,
              "Erreur:",
              error
            );
            break;
          }
        }

        await poolClient.query("COMMIT");
        console.log(
          "Tous les items ont été insérés avec succès dans la base de données cible."
        );
      } catch (error) {
        await poolClient.query("ROLLBACK");
        console.error("Erreur lors de l'insertion des items:", error);
      } finally {
        poolClient.release();
      }
    } catch (error) {
      console.error(
        "Erreur lors de la récupération ou de l'insertion des items:",
        error
      );
    }
  },

  
};

export default swapEbpController;
