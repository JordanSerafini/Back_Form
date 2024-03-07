BEGIN;

-- Création de la table Users pour les commerciaux et les créateurs de formulaires
CREATE TABLE Users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL
);

-- Création de la table Formulaires, avec une colonne pour les clients
CREATE TABLE Formulaires (
    id SERIAL PRIMARY KEY,
    nom_formulaire VARCHAR(255) NOT NULL,
    nom_client VARCHAR(255) NOT NULL,
    date_creation TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    commercial_id INTEGER REFERENCES Users(id) ON DELETE SET NULL
);


-- Création de la table Questions qui font partie d'une partie de formulaire
CREATE TABLE Questions (
    id SERIAL PRIMARY KEY,
    title TEXT,
    response TEXT,
    formulaire_id INTEGER REFERENCES Formulaires(id) ON DELETE CASCADE
);

CREATE TABLE Textarea (
    id SERIAL PRIMARY KEY,
    title TEXT,
    response TEXT,
    formulaire_id INTEGER REFERENCES Formulaires(id) ON DELETE CASCADE
);

CREATE TABLE Rate (
    id SERIAL PRIMARY KEY,
    title TEXT,
    note INTEGER ,
    formulaire_id INTEGER REFERENCES Formulaires(id) ON DELETE CASCADE
);




COMMIT;