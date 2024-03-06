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

-- Création de la table Parties qui font partie d'un formulaire
CREATE TABLE Parties (
    id SERIAL PRIMARY KEY,
    nom_partie VARCHAR(255) NOT NULL,
    formulaire_id INTEGER REFERENCES Formulaires(id) ON DELETE CASCADE
);

-- Création de la table Questions qui font partie d'une partie de formulaire
CREATE TABLE Questions (
    id SERIAL PRIMARY KEY,
    reponse TEXT,
    note INTEGER,
    partie_id INTEGER REFERENCES Parties(id) ON DELETE CASCADE
);


COMMIT;