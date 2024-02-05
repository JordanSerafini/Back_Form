import sqlite3 from "sqlite3";

const databasePath: string = "db.sqlite";

class Model {
  private static dbInstance: sqlite3.Database;

  constructor() {}

  private static getDbInstance() {
    if (this.dbInstance) {
      return this.dbInstance;
    }

    this.dbInstance = new sqlite3.Database(databasePath, (err) => {
      if (err) {
        console.error(
          "Erreur lors de l'ouverture de la base de données SQLite:",
          err.message
        );
      } else {
        console.log("Base de données SQLite connectée avec succès.");
      }
    });
    return this.dbInstance;
  }

  protected static get(sql: string, params: any[] = []): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      this.getDbInstance().get(sql, params, (err, row) => {
        if (err) {
          console.error(
            "Erreur lors de l'exécution de la requête SQL:",
            err.message
          );
          reject(err);
        } else {
          resolve(row);
        }
      });
    });
  }

  protected static all(sql: string, params: any[] = []): Promise<any[]> {
    return new Promise<any[]>((resolve, reject) => {
      this.getDbInstance().all(sql, params, (err, rows) => {
        if (err) {
          console.error(
            "Erreur lors de l'exécution de la requête SQL:",
            err.message
          );
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });
  }

  protected static run(sql: string, params: any[] = []): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      this.getDbInstance().run(sql, params, function (err) {
        if (err) {
          console.error(
            "Erreur lors de l'exécution de la commande SQL:",
            err.message
          );
          reject(err);
        } else {
          console.log(
            `Commande SQL exécutée avec succès, RowID: ${this.lastID}`
          );
          resolve();
        }
      });
    });
  }
}

class UserModel extends Model {
  public static insertUser(
    name: string,
    fonction: string,
    date: string
  ): Promise<void> {
    const sql = "INSERT INTO user (name, fonction, date) VALUES (?, ?, ?)";
    return this.run(sql, [name, fonction, date]);
  }
}

class QuestionModel extends Model {
  public static insertQuestion(
    formID: number,
    questionID: number,
    rating: number,
    userID: number
  ): Promise<void> {
    const sql =
      "INSERT INTO question (formID, questionID, rating, userID) VALUES (?, ?, ?, ?)";
    return this.run(sql, [formID, questionID, rating, userID]);
  }
}

class CommentModel extends Model {
  public static insertComment(
    formID: number,
    comment: string,
    userID: number
  ): Promise<void> {
    const sql =
      "INSERT INTO comment (formID, comment, userID) VALUES (?, ?, ?)";
    return this.run(sql, [formID, comment, userID]);
  }
}

export { UserModel, QuestionModel, CommentModel };
