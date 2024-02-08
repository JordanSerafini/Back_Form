BEGIN;

-- Création de la table "user"
CREATE TABLE IF NOT EXISTS "user" (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  fonction TEXT NOT NULL,
  date DATE NOT NULL
);

-- Création de la table "utilisateur"
CREATE TABLE IF NOT EXISTS utilisateur (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL, -- Assure l'unicité des emails
  password TEXT NOT NULL
); 

-- Création de la table "form"
CREATE TABLE IF NOT EXISTS form (
  id SERIAL PRIMARY KEY,
  userID INTEGER NOT NULL REFERENCES "user"(id)
);

-- Correction de la table "question"
CREATE TABLE IF NOT EXISTS question (
  id SERIAL PRIMARY KEY,
  formID INTEGER NOT NULL --REFERENCES "form"(id), --
  questionID INTEGER NOT NULL, 
  rating INTEGER NOT NULL
  userID INTEGER NOT NULL REFERENCES "user"(id) 
);

-- Correction de la table "comment"
CREATE TABLE IF NOT EXISTS comment (
  id SERIAL PRIMARY KEY,
  formID INTEGER NOT NULL --REFERENCES "form"(id), --
  comment TEXT NOT NULL
  userID INTEGER NOT NULL REFERENCES "user"(id)
);

COMMIT;
