--Recupérer toutes les questions avec le nom de l'utilisateur qui a répondu

SELECT question.*, "user".name AS username
FROM question
JOIN "user" ON question.userid = "user".id;
