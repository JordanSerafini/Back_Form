--Recupérer toutes les questions avec le nom de l'utilisateur qui a répondu

SELECT question.*, "user".name AS username
FROM question
JOIN "user" ON question.userid = "user".id;

--Récupérer les informations des utilisateurs et leurs formulaires
SELECT u.id AS user_id, u.name AS user_name, u.fonction, u.date, f.id AS form_id
FROM "user" u
JOIN form f ON u.id = f.userID;

--Récupérer tous les formulaires avec leurs questions et notes
SELECT f.id AS form_id, q.questionID, q.rating
FROM form f
JOIN question q ON f.id = q.formID;

--Récupérer les commentaires pour chaque formulaire
SELECT f.id AS form_id, c.comment, u.name AS user_name, u.fonction
FROM comment c
JOIN form f ON c.formID = f.id
JOIN "user" u ON c.userID = u.id;

--Récupérer les informations d'utilisateurs avec leurs questions et réponses
SELECT u.id AS user_id, u.name AS user_name, u.fonction, q.questionID, q.rating
FROM "user" u
JOIN question q ON u.id = q.userID;


SELECT
    column_name,
    data_type,
    character_maximum_length,
    column_default,
    is_nullable
FROM
    information_schema.columns
WHERE
    table_name = 'event';
