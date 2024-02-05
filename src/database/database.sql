BEGIN;

CREATE TABLE IF NOT EXISTS user (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  fonction TEXT NOT NULL,
  date DATE NOT NULL
);

-- Assurez-vous que la table 'form' existe pour les clés étrangères suivantes

CREATE TABLE question (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  formID INTEGER NOT NULL,
  questionID INTEGER NOT NULL,
  rating INTEGER NOT NULL,
  userID INTEGER NOT NULL,
  FOREIGN KEY (userID) REFERENCES user(id)
);


CREATE TABLE comment (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  formID INTEGER NOT NULL,
  comment TEXT NOT NULL,
  userID INTEGER NOT NULL,
  FOREIGN KEY (userID) REFERENCES user(id)
);

--DELETE FROM user;
--DELETE FROM question; 
--DELETE FROM comment;

COMMIT;
