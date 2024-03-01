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

SELECT table_name
FROM information_schema.tables
WHERE table_schema = 'public';



-- Événements pour les 15 prochains jours
INSERT INTO event (Caption, StartDateTime, EndDateTime, ExpectedDuration_DurationInHours, AchievedDuration_DurationInHours, ColleagueId, NotesClear, xx_Type_Tache)
VALUES 
-- Jour 2
('Réunion de suivi de projet', CURRENT_DATE + INTERVAL '2 DAY', CURRENT_DATE + INTERVAL '2 DAY' + INTERVAL '1 HOUR', 1, 1, 'Philippe Tremblay', 'Réunion pour suivre l''avancement du projet', 'rendez-vous'),
('Appel avec fournisseur Z', CURRENT_DATE + INTERVAL '2 DAY', CURRENT_DATE + INTERVAL '2 DAY' + INTERVAL '30 MINUTES', 0.5, 0.5, 'Émilie Bouchard', 'Appel pour vérifier le statut de la commande en cours', 'rdv tel'),
('Formation logiciels internes', CURRENT_DATE + INTERVAL '2 DAY', CURRENT_DATE + INTERVAL '2 DAY' + INTERVAL '4 HOURS', 4, 4, 'Gilles Gagnon', 'Formation sur l''utilisation des nouveaux logiciels', 'formation'),
-- Jour 3
('Réunion avec l''équipe commerciale', CURRENT_DATE + INTERVAL '3 DAY', CURRENT_DATE + INTERVAL '3 DAY' + INTERVAL '2 HOURS', 2, 2, 'Marie Bergeron', 'Réunion pour discuter des objectifs de vente', 'rendez-vous'),
('Déplacement chez client A', CURRENT_DATE + INTERVAL '3 DAY', CURRENT_DATE + INTERVAL '3 DAY' + INTERVAL '4 HOURS', 4, 4, 'Caroline Lambert', 'Déplacement pour présenter les nouveaux produits', 'rendez-vous'),
('Appel téléphonique avec client B', CURRENT_DATE + INTERVAL '3 DAY', CURRENT_DATE + INTERVAL '3 DAY' + INTERVAL '30 MINUTES', 0.5, 0.5, 'Stéphane Dubois', 'Appel pour résoudre des problèmes rencontrés par le client B', 'rdv tel'),
-- Jour 4
('Présentation de rapport client C', CURRENT_DATE + INTERVAL '4 DAY', CURRENT_DATE + INTERVAL '4 DAY' + INTERVAL '2 HOURS', 2, 2, 'Isabelle Gagnon', 'Présentation des rapports de performances au client C', 'rendez-vous'),
('Formation sur les techniques de vente', CURRENT_DATE + INTERVAL '4 DAY', CURRENT_DATE + INTERVAL '4 DAY' + INTERVAL '4 HOURS', 4, 4, 'Sophie Morin', 'Formation sur les techniques avancées de vente', 'formation'),
('Rendez-vous avec fournisseur D', CURRENT_DATE + INTERVAL '4 DAY', CURRENT_DATE + INTERVAL '4 DAY' + INTERVAL '1 HOUR', 1, 1, 'François Lefebvre', 'Discussion sur les tarifs et les produits avec le fournisseur D', 'rendez-vous'),
-- Jour 5
('Visite client E pour suivi', CURRENT_DATE + INTERVAL '5 DAY', CURRENT_DATE + INTERVAL '5 DAY' + INTERVAL '2 HOURS', 2, 2, 'Catherine Tremblay', 'Visite de suivi pour évaluer la satisfaction du client E', 'rendez-vous'),
('Appel téléphonique avec partenaire F', CURRENT_DATE + INTERVAL '5 DAY', CURRENT_DATE + INTERVAL '5 DAY' + INTERVAL '30 MINUTES', 0.5, 0.5, 'François Lavoie', 'Appel pour discuter des prochaines étapes de collaboration', 'rdv tel'),
('Réunion équipe projet G', CURRENT_DATE + INTERVAL '5 DAY', CURRENT_DATE + INTERVAL '5 DAY' + INTERVAL '1 HOUR', 1, 1, 'Marie-Claude Gauthier', 'Réunion pour discuter de l''avancement du projet G', 'rendez-vous'),
-- Jour 6
('Présentation de nouveaux services', CURRENT_DATE + INTERVAL '6 DAY', CURRENT_DATE + INTERVAL '6 DAY' + INTERVAL '2 HOURS', 2, 2, 'Étienne Caron', 'Présentation des nouveaux services à l''équipe', 'rendez-vous'),
('Formation avancée sur le logiciel X', CURRENT_DATE + INTERVAL '6 DAY', CURRENT_DATE + INTERVAL '6 DAY' + INTERVAL '4 HOURS', 4, 4, 'Benoît Dubé', 'Formation approfondie sur l''utilisation du logiciel X', 'formation'),
('Déjeuner réseau professionnel', CURRENT_DATE + INTERVAL '6 DAY', CURRENT_DATE + INTERVAL '6 DAY' + INTERVAL '1 HOUR' + INTERVAL '30 MINUTES', 1.5, 1.5, 'Valérie Bélanger', 'Déjeuner pour élargir le réseau professionnel', 'rendez-vous'),
-- Jour 7
('Réunion stratégique trimestrielle', CURRENT_DATE + INTERVAL '7 DAY', CURRENT_DATE + INTERVAL '7 DAY' + INTERVAL '2 HOURS', 2, 2, 'Julie Gauthier', 'Réunion pour établir la stratégie du prochain trimestre', 'rendez-vous'),
('Déplacement chez client H', CURRENT_DATE + INTERVAL '7 DAY', CURRENT_DATE + INTERVAL '7 DAY' + INTERVAL '4 HOURS', 4, 4, 'Nathalie Boucher', 'Déplacement pour présenter les solutions au client H', 'rendez-vous'),
('Appel téléphonique avec partenaire I', CURRENT_DATE + INTERVAL '7 DAY', CURRENT_DATE + INTERVAL '7 DAY' + INTERVAL '30 MINUTES', 0.5, 0.5, 'Alexandre Roy', 'Appel pour discuter des détails de la collaboration avec le partenaire I', 'rdv tel'),
-- Jour 8
('Formation sur les bonnes pratiques RH', CURRENT_DATE + INTERVAL '8 DAY', CURRENT_DATE + INTERVAL '8 DAY' + INTERVAL '4 HOURS', 4, 4, 'Sylvie Tremblay', 'Formation sur les nouvelles réglementations en matière de RH', 'formation'),
('Présentation des résultats du trimestre', CURRENT_DATE + INTERVAL '8 DAY', CURRENT_DATE + INTERVAL '8 DAY' + INTERVAL '2 HOURS', 2, 2, 'Patrick Gagné', 'Présentation des résultats financiers et opérationnels', 'rendez-vous'),
('Rendez-vous avec client J', CURRENT_DATE + INTERVAL '8 DAY', CURRENT_DATE + INTERVAL '8 DAY' + INTERVAL '1 HOUR', 1, 1, 'Guillaume Bergeron', 'Discussion sur les opportunités commerciales avec le client J', 'rendez-vous'),
-- Jour 9
('Déplacement chez client K', CURRENT_DATE + INTERVAL '9 DAY', CURRENT_DATE + INTERVAL '9 DAY' + INTERVAL '4 HOURS', 4, 4, 'Sébastien Lavoie', 'Déplacement pour évaluer les besoins du client K', 'rendez-vous'),
('Appel téléphonique avec partenaire L', CURRENT_DATE + INTERVAL '9 DAY', CURRENT_DATE + INTERVAL '9 DAY' + INTERVAL '30 MINUTES', 0.5, 0.5, 'Julien Gauthier', 'Appel pour discuter des plans de marketing avec le partenaire L', 'rdv tel'),
-- Jour 10
('Présentation des indicateurs de performance', CURRENT_DATE + INTERVAL '10 DAY', CURRENT_DATE + INTERVAL '10 DAY' + INTERVAL '2 HOURS', 2, 2, 'Sophie Bergeron', 'Présentation des KPIs pour évaluer les performances', 'rendez-vous'),
('Formation sur les techniques de négociation', CURRENT_DATE + INTERVAL '10 DAY', CURRENT_DATE + INTERVAL '10 DAY' + INTERVAL '4 HOURS', 4, 4, 'François Tremblay', 'Formation avancée sur les techniques de négociation', 'formation'),
('Déjeuner avec client M', CURRENT_DATE + INTERVAL '10 DAY', CURRENT_DATE + INTERVAL '10 DAY' + INTERVAL '1 HOUR' + INTERVAL '30 MINUTES', 1.5, 1.5, 'Marie-Claude Lavoie', 'Déjeuner pour renforcer la relation avec le client M', 'rendez-vous'),
-- Jour 11
('Réunion stratégique avec la direction', CURRENT_DATE + INTERVAL '11 DAY', CURRENT_DATE + INTERVAL '11 DAY' + INTERVAL '2 HOURS', 2, 2, 'Jean-François Boucher', 'Réunion pour discuter des objectifs à long terme', 'rendez-vous'),
('Déplacement chez client N', CURRENT_DATE + INTERVAL '11 DAY', CURRENT_DATE + INTERVAL '11 DAY' + INTERVAL '4 HOURS', 4, 4, 'André Gagnon', 'Déplacement pour évaluer les besoins du client N', 'rendez-vous'),
('Appel téléphonique avec partenaire O', CURRENT_DATE + INTERVAL '11 DAY', CURRENT_DATE + INTERVAL '11 DAY' + INTERVAL '30 MINUTES', 0.5, 0.5, 'Carole Lévesque', 'Appel pour discuter des opportunités de collaboration avec le partenaire O', 'rdv tel'),
-- Jour 12
('Présentation des nouvelles fonctionnalités', CURRENT_DATE + INTERVAL '12 DAY', CURRENT_DATE + INTERVAL '12 DAY' + INTERVAL '2 HOURS', 2, 2, 'Guillaume Gauthier', 'Présentation des nouvelles fonctionnalités du produit', 'rendez-vous'),
('Formation sur la gestion du temps', CURRENT_DATE + INTERVAL '12 DAY', CURRENT_DATE + INTERVAL '12 DAY' + INTERVAL '4 HOURS', 4, 4, 'Marie-Josée Bergeron', 'Formation sur l''optimisation de la gestion du temps', 'formation'),
('Déjeuner réseau professionnel', CURRENT_DATE + INTERVAL '12 DAY', CURRENT_DATE + INTERVAL '12 DAY' + INTERVAL '1 HOUR' + INTERVAL '30 MINUTES', 1.5, 1.5, 'François Leclerc', 'Déjeuner pour élargir le réseau professionnel', 'rendez-vous'),
-- Jour 13
('Réunion de coordination des équipes', CURRENT_DATE + INTERVAL '13 DAY', CURRENT_DATE + INTERVAL '13 DAY' + INTERVAL '2 HOURS', 2, 2, 'Sébastien Bergeron', 'Réunion pour coordonner les actions entre les équipes', 'rendez-vous'),
('Déplacement chez client P', CURRENT_DATE + INTERVAL '13 DAY', CURRENT_DATE + INTERVAL '13 DAY' + INTERVAL '4 HOURS', 4, 4, 'Véronique Lavoie', 'Déplacement pour évaluer les besoins du client P', 'rendez-vous'),
('Appel téléphonique avec partenaire Q', CURRENT_DATE + INTERVAL '13 DAY', CURRENT_DATE + INTERVAL '13 DAY' + INTERVAL '30 MINUTES', 0.5, 0.5, 'Martin Gauthier', 'Appel pour discuter des opportunités de partenariat avec le partenaire Q', 'rdv tel'),
-- Jour 14
('Présentation des résultats de l''étude de marché', CURRENT_DATE + INTERVAL '14 DAY', CURRENT_DATE + INTERVAL '14 DAY' + INTERVAL '2 HOURS', 2, 2, 'Isabelle Bergeron', 'Présentation des conclusions de l''étude de marché', 'rendez-vous'),
('Formation sur la communication interpersonnelle', CURRENT_DATE + INTERVAL '14 DAY', CURRENT_DATE + INTERVAL '14 DAY' + INTERVAL '4 HOURS', 4, 4, 'Jean-François Tremblay', 'Formation sur l''amélioration de la communication', 'formation'),
('Déjeuner avec client R', CURRENT_DATE + INTERVAL '14 DAY', CURRENT_DATE + INTERVAL '14 DAY' + INTERVAL '1 HOUR' + INTERVAL '30 MINUTES', 1.5, 1.5, 'Émilie Gagnon', 'Déjeuner pour renforcer la relation avec le client R', 'rendez-vous'),
-- Jour 15
('Réunion pour évaluation des projets en cours', CURRENT_DATE + INTERVAL '15 DAY', CURRENT_DATE + INTERVAL '15 DAY' + INTERVAL '2 HOURS', 2, 2,'Émilie Gagnon', 'Déjeuner pour renforcer la relation avec le client R', 'rendez-vous')
