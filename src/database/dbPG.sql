BEGIN;

CREATE TABLE IF NOT EXISTS "user" (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  fonction TEXT NOT NULL,
  date DATE NOT NULL
);

CREATE TABLE IF NOT EXISTS question (
  id SERIAL PRIMARY KEY,
  formID INTEGER NOT NULL,
  questionID INTEGER NOT NULL,
  rating INTEGER NOT NULL,
  userID INTEGER NOT NULL REFERENCES "user"(id) --
);

CREATE TABLE IF NOT EXISTS comment (
  id SERIAL PRIMARY KEY,
  formID INTEGER NOT NULL,
  comment TEXT NOT NULL,
  userID INTEGER NOT NULL REFERENCES "user"(id) --
);

CREATE TABLE IF NOT EXISTS utilisateur (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  password TEXT NOT NULL,
);

CREATE TABLE IF NOT EXISTS form (
  id SERIAL PRIMARY KEY,
  userID INTEGER NOT NULL REFERENCES "user"(id) 
  
);
COMMIT;
