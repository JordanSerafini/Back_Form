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
  email TEXT UNIQUE NOT NULL, 
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

-- Devis et table liaisons
CREATE TABLE devis (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255),
    userID INTEGER,
    FOREIGN KEY (userID) REFERENCES utilisateur(id)
);

CREATE TABLE devis_items (
    devisID INTEGER,
    itemID INTEGER,
    FOREIGN KEY (devisID) REFERENCES devis(id),
    FOREIGN KEY (itemID) REFERENCES item(IDperso)
);

CREATE TABLE IF NOT EXISTS blacklisted_tokens (
    id SERIAL PRIMARY KEY,
    token VARCHAR(255) UNIQUE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);



COMMIT;
