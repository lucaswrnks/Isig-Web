-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1
-- Généré le : sam. 11 avr. 2026 à 22:09
-- Version du serveur : 10.4.32-MariaDB
-- Version de PHP : 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `university`
--

-- --------------------------------------------------------

--
-- Structure de la table `avis_formation`
--

CREATE TABLE `avis_formation` (
  `id` int(11) NOT NULL,
  `id_etudiant` int(11) NOT NULL,
  `id_formation` int(11) NOT NULL,
  `note` int(11) NOT NULL CHECK (`note` between 1 and 5),
  `commentaire` text DEFAULT NULL,
  `created_at` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `avis_formation`
--

INSERT INTO `avis_formation` (`id`, `id_etudiant`, `id_formation`, `note`, `commentaire`, `created_at`) VALUES
(1, 1, 1, 5, 'Excellente formation, très complète', '2026-04-11 11:12:58'),
(2, 2, 1, 4, 'Bons cours, profs disponibles', '2026-04-11 11:12:58'),
(3, 3, 1, 3, 'Correct mais manque de pratique', '2026-04-11 11:12:58'),
(4, 4, 2, 4, 'Très bien pour les réseaux', '2026-04-11 11:12:58'),
(5, 5, 2, 5, 'Formation au top', '2026-04-11 11:12:58'),
(6, 7, 1, 4, 'Je recommande', '2026-04-11 11:12:58'),
(7, 8, 3, 3, 'Bien mais trop court', '2026-04-11 11:12:58'),
(8, 9, 3, 5, 'Super formation dev web', '2026-04-11 11:12:58'),
(9, 10, 4, 2, 'Pas assez de TP', '2026-04-11 11:12:58'),
(10, 11, 4, 4, 'Bonne formation cybersécurité', '2026-04-11 11:12:58'),
(11, 12, 5, 3, 'Contenu intéressant', '2026-04-11 11:12:58'),
(12, 1, 6, 5, 'Génie logiciel très complet', '2026-04-11 11:12:58'),
(13, 2, 7, 4, 'Bonne formation réseaux', '2026-04-11 11:12:58'),
(14, 3, 8, 5, 'Master excellent', '2026-04-11 11:12:58'),
(15, 4, 9, 4, 'Data science bien encadré', '2026-04-11 11:12:58'),
(16, 5, 10, 3, 'Correct, peut mieux faire', '2026-04-11 11:12:58'),
(17, 12, 10, 4, 'Super!', '2026-04-11 09:24:15');

-- --------------------------------------------------------

--
-- Structure de la table `classe`
--

CREATE TABLE `classe` (
  `id` int(11) NOT NULL,
  `nom` varchar(100) NOT NULL,
  `annee` int(11) NOT NULL COMMENT '1 = 1ère année, 2 = 2ème année, etc.',
  `id_formation` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `classe`
--

INSERT INTO `classe` (`id`, `nom`, `annee`, `id_formation`) VALUES
(1, 'BTS SIO SLAM 1', 1, 1),
(2, 'BTS SIO SLAM 2', 2, 1),
(3, 'BTS SIO SISR 1', 1, 2),
(4, 'BTS SIO SISR 2', 2, 2),
(5, 'Bachelor Dev Web 1', 1, 3),
(6, 'Bachelor Dev Web 2', 2, 3),
(7, 'Bachelor Dev Web 3', 3, 3),
(8, 'Bachelor Cyber 1', 1, 4),
(9, 'Bachelor Cyber 2', 2, 4),
(10, 'Bachelor Cyber 3', 3, 4),
(11, 'Licence GL 1', 1, 6),
(12, 'Licence GL 2', 2, 6),
(13, 'Licence GL 3', 3, 6),
(14, 'Master IL 1', 1, 8),
(15, 'Master IL 2', 2, 8),
(16, 'Master DS 1', 1, 9),
(17, 'Master DS 2', 2, 9);

-- --------------------------------------------------------

--
-- Structure de la table `contact`
--

CREATE TABLE `contact` (
  `id` int(11) NOT NULL,
  `nom` varchar(100) NOT NULL,
  `email` varchar(150) NOT NULL,
  `telephone` varchar(20) DEFAULT '',
  `photo` varchar(255) DEFAULT NULL,
  `fichier` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `contact`
--

INSERT INTO `contact` (`id`, `nom`, `email`, `telephone`, `photo`, `fichier`) VALUES
(1, 'secretaire', 'secretaire@isig.fr', '0623366635', NULL, NULL);

-- --------------------------------------------------------

--
-- Structure de la table `cours`
--

CREATE TABLE `cours` (
  `id` int(11) NOT NULL,
  `nom` varchar(150) NOT NULL,
  `id_enseignant` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `cours`
--

INSERT INTO `cours` (`id`, `nom`, `id_enseignant`) VALUES
(1, 'Mathématiques', 1),
(2, 'Algorithmique', 1),
(3, 'Base de données', 2),
(4, 'Développement Web', 2),
(5, 'Réseaux', 3),
(6, 'Systèmes exploitation', 3),
(7, 'Anglais Technique', 4),
(8, 'Gestion de projet', 4),
(9, 'Sécurité informatique', 5),
(10, 'Intelligence Artificielle', 6);

-- --------------------------------------------------------

--
-- Structure de la table `cours_classe`
--

CREATE TABLE `cours_classe` (
  `id_cours` int(11) NOT NULL,
  `id_classe` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `cours_classe`
--

INSERT INTO `cours_classe` (`id_cours`, `id_classe`) VALUES
(1, 1),
(1, 2),
(1, 3),
(1, 4),
(2, 1),
(2, 2),
(2, 3),
(2, 4),
(3, 1),
(3, 2),
(3, 3),
(3, 4),
(4, 5),
(4, 6),
(4, 7),
(5, 3),
(5, 4),
(6, 3),
(6, 4),
(7, 1),
(7, 2),
(7, 3),
(7, 4),
(8, 1),
(8, 2),
(9, 8),
(9, 9),
(9, 10),
(10, 16),
(10, 17);

-- --------------------------------------------------------

--
-- Structure de la table `enseignant`
--

CREATE TABLE `enseignant` (
  `id` int(11) NOT NULL,
  `nom` varchar(100) NOT NULL,
  `prenom` varchar(100) NOT NULL,
  `adresse` varchar(255) DEFAULT NULL,
  `dob` date NOT NULL,
  `phone` varchar(20) DEFAULT '',
  `email` varchar(150) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `enseignant`
--

INSERT INTO `enseignant` (`id`, `nom`, `prenom`, `adresse`, `dob`, `phone`, `email`) VALUES
(1, 'Jean', 'Benoit', '10 rue de la Paix, Paris', '1975-04-15', '0666778899', 'b.jean@isig.fr'),
(2, 'Marchand', 'Philippe', '6 allée des Roses, Lyon', '1980-07-22', '0677889900', 'p.marchand@isig.fr'),
(3, 'Girard', 'Nathalie', '18 rue Gambetta, Marseille', '1978-12-03', '0688990011', 'n.girard@isig.fr'),
(4, 'Bonnet', 'Sébastien', '2 place du Marché, Toulouse', '1982-08-10', '0699001122', 's.bonnet@isig.fr'),
(5, 'Chevalier', 'Isabelle', '33 rue de la République, Strasbourg', '1985-02-27', '0600112233', 'i.chevalier@isig.fr'),
(6, 'Morin', 'Julien', '7 avenue Jean Jaurès, Bordeaux', '1979-06-14', '0611223300', 'j.morin@isig.fr'),
(7, 'Gates', 'Bill(invité)', 'USA', '2026-04-06', '0000000000', NULL);

-- --------------------------------------------------------

--
-- Structure de la table `etudiant`
--

CREATE TABLE `etudiant` (
  `id` int(11) NOT NULL,
  `nom` varchar(100) NOT NULL,
  `prenom` varchar(100) NOT NULL,
  `adresse` varchar(255) DEFAULT NULL,
  `dob` date NOT NULL,
  `phone` varchar(20) DEFAULT '',
  `email` varchar(150) DEFAULT NULL,
  `id_classe` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `etudiant`
--

INSERT INTO `etudiant` (`id`, `nom`, `prenom`, `adresse`, `dob`, `phone`, `email`, `id_classe`) VALUES
(1, 'Dupont', 'Alice', '12 rue des Lilas, Toulouse', '2001-03-15', '0612345678', 'alice.dupont@isig.fr', 1),
(2, 'Martin', 'Baptiste', '5 allée des Roses, Toulouse', '2000-07-22', '0623456789', 'baptiste.martin@isig.fr', 1),
(3, 'Bernard', 'Clara', '8 avenue Victor Hugo, Marseille', '2002-01-10', '0634567890', 'clara.bernard@isig.fr', 2),
(4, 'Leroy', 'David', '3 impasse des Pins, Toulouse', '2001-11-05', '0645678901', 'david.leroy@isig.fr', 3),
(5, 'Moreau', 'Emma', '27 rue Nationale, Toulouse', '2000-05-18', '0656789012', 'emma.moreau@isig.fr', 4),
(7, 'Durand', 'Sophie', '14 rue Pasteur, Paris', '2002-05-12', '0611223344', 'sophie.durand@isig.fr', 5),
(8, 'Lambert', 'Thomas', '8 avenue Foch, Lyon', '2001-09-23', '0622334455', 'thomas.lambert@isig.fr', 6),
(9, 'Petit', 'Camille', '3 rue Voltaire, Bordeaux', '2003-01-08', '0633445566', 'camille.petit@isig.fr', 11),
(10, 'Rousseau', 'Hugo', '21 boulevard Victor Hugo, Nantes', '2002-12-02', '0644556677', 'hugo.rousseau@isig.fr', 14),
(11, 'Fontaine', 'Léa', '5 impasse des Acacias, Lille', '2001-03-18', '0655667788', 'lea.fontaine@isig.fr', 8),
(12, 'Martin', 'Dorian', '15 avenue de benoit', '1999-03-04', '0623145287', 'dorian@isig.fr', 16),
(14, 'Marin', 'Mathieu', '17 rue des romarins, Nice', '1998-04-15', '0701123458', 'm.mathieu@isig.fr', 2);

-- --------------------------------------------------------

--
-- Structure de la table `formation`
--

CREATE TABLE `formation` (
  `id` int(11) NOT NULL,
  `nom` varchar(100) NOT NULL,
  `type` enum('BTS','Bachelor','Licence','Master') NOT NULL,
  `description` text DEFAULT NULL,
  `duree` int(11) DEFAULT 2 COMMENT 'Durée en années'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `formation`
--

INSERT INTO `formation` (`id`, `nom`, `type`, `description`, `duree`) VALUES
(1, 'Services Informatiques aux Organisations – option SLAM', 'BTS', 'BTS SIO option Solutions Logicielles et Applications Métiers', 2),
(2, 'Services Informatiques aux Organisations – option SISR', 'BTS', 'BTS SIO option Solutions d\'Infrastructure, Systèmes et Réseaux', 2),
(3, 'Développement Web & Mobile', 'Bachelor', 'Bachelor spécialisé en développement web, mobile et API', 3),
(4, 'Cybersécurité & Réseaux', 'Bachelor', 'Bachelor en sécurité informatique et administration réseau', 3),
(5, 'Intelligence Artificielle & Data', 'Bachelor', 'Bachelor en IA, machine learning et data science', 3),
(6, 'Informatique parcours Génie Logiciel', 'Licence', 'Licence informatique option développement logiciel', 3),
(7, 'Informatique parcours Réseaux & Systèmes', 'Licence', 'Licence informatique option réseaux et systèmes', 3),
(8, 'Ingénierie Logicielle', 'Master', 'Master spécialisé en architecture logicielle et DevOps', 2),
(9, 'Data Science & Intelligence Artificielle', 'Master', 'Master en science des données et intelligence artificielle', 2),
(10, 'Cybersécurité', 'Master', 'Master en cybersécurité, ethical hacking et forensics', 2);

-- --------------------------------------------------------

--
-- Structure de la table `note`
--

CREATE TABLE `note` (
  `id` int(11) NOT NULL,
  `id_etudiant` int(11) NOT NULL,
  `id_cours` int(11) NOT NULL,
  `note` float NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `note`
--

INSERT INTO `note` (`id`, `id_etudiant`, `id_cours`, `note`) VALUES
(1, 1, 1, 14),
(2, 1, 2, 16),
(3, 1, 3, 12),
(4, 1, 4, 18),
(5, 1, 5, 11),
(6, 1, 6, 13),
(7, 1, 7, 15),
(8, 1, 8, 12),
(9, 2, 1, 10),
(10, 2, 2, 13),
(11, 2, 3, 15),
(12, 2, 4, 12),
(13, 2, 5, 9),
(14, 2, 6, 11),
(15, 2, 7, 14),
(16, 2, 8, 10),
(17, 3, 1, 17),
(18, 3, 2, 15),
(19, 3, 3, 14),
(20, 3, 4, 16),
(21, 3, 5, 13),
(22, 3, 6, 12),
(23, 3, 7, 16),
(24, 3, 8, 14),
(25, 4, 1, 8),
(26, 4, 2, 11),
(27, 4, 3, 10),
(28, 4, 4, 13),
(29, 4, 5, 12),
(30, 4, 6, 9),
(31, 4, 7, 11),
(32, 4, 8, 13),
(33, 5, 1, 15),
(34, 5, 2, 14),
(35, 5, 3, 16),
(36, 5, 4, 17),
(37, 5, 5, 10),
(38, 5, 6, 15),
(39, 5, 7, 13),
(40, 5, 8, 16),
(49, 7, 1, 12),
(50, 7, 2, 14),
(51, 7, 3, 15),
(52, 7, 4, 11),
(53, 7, 5, 13),
(54, 7, 6, 10),
(55, 7, 7, 12),
(56, 7, 8, 15),
(57, 8, 1, 16),
(58, 8, 2, 12),
(59, 8, 3, 13),
(60, 8, 4, 15),
(61, 8, 5, 14),
(62, 8, 6, 16),
(63, 8, 7, 11),
(64, 8, 8, 13),
(65, 9, 1, 9),
(66, 9, 2, 11),
(67, 9, 3, 14),
(68, 9, 4, 10),
(69, 9, 5, 12),
(70, 9, 6, 13),
(71, 9, 7, 10),
(72, 9, 8, 12),
(73, 10, 1, 18),
(74, 10, 2, 17),
(75, 10, 3, 16),
(76, 10, 4, 15),
(77, 10, 5, 14),
(78, 10, 6, 18),
(79, 10, 7, 17),
(80, 10, 8, 15),
(81, 11, 1, 11),
(82, 11, 2, 13),
(83, 11, 3, 10),
(84, 11, 4, 12),
(85, 11, 5, 15),
(86, 11, 6, 11),
(87, 11, 7, 13),
(88, 11, 8, 10),
(89, 2, 1, 11),
(90, 1, 1, 13),
(91, 1, 1, 12),
(92, 1, 1, 17.5),
(93, 1, 1, 15);

-- --------------------------------------------------------

--
-- Structure de la table `salle`
--

CREATE TABLE `salle` (
  `id` int(11) NOT NULL,
  `numero` varchar(20) NOT NULL,
  `description` varchar(255) DEFAULT NULL,
  `nombre_chaises` int(11) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `salle`
--

INSERT INTO `salle` (`id`, `numero`, `description`, `nombre_chaises`) VALUES
(1, 'A101', 'Salle de cours standard', 30),
(2, 'A102', 'Salle de cours standard', 30),
(3, 'B201', 'Salle informatique', 20),
(4, 'B202', 'Salle informatique', 20),
(5, 'C301', 'Amphithéâtre', 80),
(6, 'C302', 'Salle de réunion', 16);

-- --------------------------------------------------------

--
-- Structure de la table `session`
--

CREATE TABLE `session` (
  `id` int(11) NOT NULL,
  `titre` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `date_debut` datetime NOT NULL,
  `date_fin` datetime NOT NULL,
  `id_cours` int(11) NOT NULL,
  `id_salle` int(11) DEFAULT NULL,
  `id_enseignant` int(11) NOT NULL,
  `capacite_max` int(11) DEFAULT 30
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `session`
--

INSERT INTO `session` (`id`, `titre`, `description`, `date_debut`, `date_fin`, `id_cours`, `id_salle`, `id_enseignant`, `capacite_max`) VALUES
(1, 'CM Mathématiques', 'Introduction aux suites et séries', '2026-03-16 08:00:00', '2026-03-16 10:00:00', 1, 5, 1, 80),
(2, 'TD Mathématiques', 'Exercices sur les intégrales', '2026-03-16 10:00:00', '2026-03-16 12:00:00', 1, 1, 1, 30),
(3, 'CM Algorithmique', 'Tri et recherche dichotomique', '2026-03-17 08:00:00', '2026-03-17 10:00:00', 2, 5, 1, 80),
(4, 'TP Algorithmique', 'Implémentation en Python', '2026-03-17 10:00:00', '2026-03-17 12:00:00', 2, 3, 1, 20),
(5, 'CM Base de données', 'Modélisation MCD/MLD', '2026-03-18 08:00:00', '2026-03-18 10:00:00', 3, 5, 2, 80),
(6, 'TP Base de données', 'Requêtes SQL avancées', '2026-03-18 14:00:00', '2026-03-18 16:00:00', 3, 4, 2, 20),
(7, 'CM Développement Web', 'Introduction à Node.js et Express', '2026-03-19 08:00:00', '2026-03-19 10:00:00', 4, 5, 2, 80),
(8, 'TP Développement Web', 'Création d\'une API REST', '2026-03-19 10:00:00', '2026-03-19 12:00:00', 4, 3, 2, 20),
(9, 'CM Réseaux', 'Protocoles TCP/IP et modèle OSI', '2026-03-20 08:00:00', '2026-03-20 10:00:00', 5, 5, 3, 80),
(10, 'TD Réseaux', 'Configuration de routeurs', '2026-03-20 14:00:00', '2026-03-20 16:00:00', 5, 2, 3, 30),
(11, 'CM Sécurité informatique', 'Cryptographie et protocoles sécurisés', '2026-03-23 08:00:00', '2026-03-23 10:00:00', 9, 5, 5, 80),
(12, 'TD Gestion de projet', 'Méthodes Agile et Scrum', '2026-03-24 13:00:00', '2026-03-24 15:00:00', 8, 6, 4, 16),
(19, 'Conférence avec Bill Gates', 'Bill Gates, cofondateur de Microsoft, donnera une conférence exceptionnelle sur l\'innovation technologique et l\'impact du numérique dans le monde.', '2026-05-20 12:00:00', '2026-05-20 13:30:00', 9, 1, 7, 60);

-- --------------------------------------------------------

--
-- Structure de la table `session_etudiant`
--

CREATE TABLE `session_etudiant` (
  `id_session` int(11) NOT NULL,
  `id_etudiant` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `session_etudiant`
--

INSERT INTO `session_etudiant` (`id_session`, `id_etudiant`) VALUES
(1, 1),
(1, 2),
(1, 3),
(1, 5),
(1, 7),
(2, 4),
(2, 5),
(2, 8),
(2, 9),
(3, 1),
(3, 2),
(3, 10),
(3, 11),
(4, 3),
(4, 4),
(4, 8),
(5, 1),
(5, 5),
(5, 7),
(5, 10),
(6, 2),
(6, 3),
(6, 9),
(7, 1),
(7, 2),
(7, 3),
(7, 11),
(8, 4),
(8, 5),
(8, 8),
(9, 1),
(9, 7),
(9, 10),
(9, 11),
(10, 2),
(10, 3),
(10, 4),
(10, 9),
(11, 5),
(11, 7),
(11, 8),
(12, 1),
(12, 3),
(12, 9),
(12, 11),
(19, 1),
(19, 2),
(19, 3),
(19, 4),
(19, 5),
(19, 7),
(19, 8),
(19, 9),
(19, 10),
(19, 11),
(19, 12);

-- --------------------------------------------------------

--
-- Structure de la table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(100) NOT NULL,
  `email` varchar(150) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` enum('admin','etudiant','enseignant','administratif') NOT NULL DEFAULT 'etudiant',
  `status` enum('active','inactive','banned') DEFAULT 'active',
  `nom` varchar(100) DEFAULT NULL,
  `prenom` varchar(100) DEFAULT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `adresse` varchar(255) DEFAULT NULL,
  `lastLogin` datetime DEFAULT NULL,
  `resetPasswordToken` varchar(255) DEFAULT NULL,
  `resetPasswordExpires` datetime DEFAULT NULL,
  `createdAt` datetime DEFAULT current_timestamp(),
  `updatedAt` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `users`
--

INSERT INTO `users` (`id`, `username`, `email`, `password`, `role`, `status`, `nom`, `prenom`, `phone`, `adresse`, `lastLogin`, `resetPasswordToken`, `resetPasswordExpires`, `createdAt`, `updatedAt`) VALUES
(1, 'admin', 'admin@isig.fr', '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'admin', 'active', 'Admin', 'ADMIN', NULL, NULL, '2026-04-11 20:08:22', NULL, NULL, '2026-03-12 18:09:02', '2026-04-11 20:08:22'),
(2, 'b.jean', 'b.jean@isig.fr', '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'enseignant', 'active', 'Jean', 'Benoit', '0666778899', '10 rue de la Paix, Paris', '2026-04-06 12:52:35', NULL, NULL, '2026-03-12 18:09:02', '2026-04-06 12:52:35'),
(3, 'p.marchand', 'p.marchand@isig.fr', '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'enseignant', 'active', 'Marchand', 'Philippe', '0677889900', '6 allée des Roses, Lyon', NULL, NULL, NULL, '2026-03-12 18:09:02', '2026-03-12 18:09:02'),
(4, 'n.girard', 'n.girard@isig.fr', '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'enseignant', 'active', 'Girard', 'Nathalie', '0688990011', '18 rue Gambetta, Marseille', NULL, NULL, NULL, '2026-03-12 18:09:02', '2026-03-12 18:09:02'),
(5, 's.bonnet', 's.bonnet@isig.fr', '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'enseignant', 'active', 'Bonnet', 'Sébastien', '0699001122', '2 place du Marché, Toulouse', NULL, NULL, NULL, '2026-03-12 18:09:02', '2026-03-12 18:09:02'),
(6, 'i.chevalier', 'i.chevalier@isig.fr', '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'enseignant', 'active', 'Chevalier', 'Isabelle', '0600112233', '33 rue de la République, Strasbourg', NULL, NULL, NULL, '2026-03-12 18:09:02', '2026-03-12 18:09:02'),
(7, 'j.morin', 'j.morin@isig.fr', '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'enseignant', 'active', 'Morin', 'Julien', '0611223300', '7 avenue Jean Jaurès, Bordeaux', NULL, NULL, NULL, '2026-03-12 18:09:02', '2026-03-12 18:09:02'),
(8, 'alice.dupont', 'alice.dupont@isig.fr', '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'etudiant', 'active', 'Dupont', 'Alice', '0612345678', '12 rue des Lilas, Toulouse', '2026-03-27 14:27:11', NULL, NULL, '2026-03-12 18:09:02', '2026-03-27 14:27:11'),
(9, 'baptiste.martin', 'baptiste.martin@isig.fr', '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'etudiant', 'active', 'Martin', 'Baptiste', '0623456789', '5 allée des Roses, Toulouse', NULL, NULL, NULL, '2026-03-12 18:09:02', '2026-03-12 18:09:02'),
(10, 'clara.bernard', 'clara.bernard@isig.fr', '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'etudiant', 'active', 'Bernard', 'Clara', '0634567890', '8 avenue Victor Hugo, Toulouse', NULL, NULL, NULL, '2026-03-12 18:09:02', '2026-03-12 18:09:02'),
(11, 'david.leroy', 'david.leroy@isig.fr', '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'etudiant', 'active', 'Leroy', 'David', '0645678901', '3 impasse des Pins, Toulouse', NULL, NULL, NULL, '2026-03-12 18:09:02', '2026-03-12 18:09:02'),
(12, 'emma.moreau', 'emma.moreau@isig.fr', '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'etudiant', 'active', 'Moreau', 'Emma', '0656789012', '27 rue Nationale, Toulouse', '2026-04-11 09:23:59', NULL, NULL, '2026-03-12 18:09:02', '2026-04-11 09:23:59'),
(13, 'lucas', 'lucas@isig.fr', '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'etudiant', 'active', 'Lucas', 'Lucas', '0623520254', 'Toulon', '2026-04-03 14:11:57', NULL, NULL, '2026-03-12 18:09:02', '2026-04-03 14:11:57'),
(14, 'sophie.durand', 'sophie.durand@isig.fr', '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'etudiant', 'active', 'Durand', 'Sophie', '0611223344', '14 rue Pasteur, Paris', NULL, NULL, NULL, '2026-03-12 18:09:02', '2026-03-12 18:09:02'),
(15, 'thomas.lambert', 'thomas.lambert@isig.fr', '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'etudiant', 'active', 'Lambert', 'Thomas', '0622334455', '8 avenue Foch, Lyon', '2026-03-12 17:57:02', NULL, NULL, '2026-03-12 18:09:02', '2026-03-12 17:57:02'),
(16, 'camille.petit', 'camille.petit@isig.fr', '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'etudiant', 'active', 'Petit', 'Camille', '0633445566', '3 rue Voltaire, Bordeaux', NULL, NULL, NULL, '2026-03-12 18:09:02', '2026-03-12 18:09:02'),
(17, 'hugo.rousseau', 'hugo.rousseau@isig.fr', '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'etudiant', 'active', 'Rousseau', 'Hugo', '0644556677', '21 boulevard Victor Hugo, Nantes', NULL, NULL, NULL, '2026-03-12 18:09:02', '2026-03-12 18:09:02'),
(18, 'lea.fontaine', 'lea.fontaine@isig.fr', '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'etudiant', 'active', 'Fontaine', 'Léa', '0655667788', '5 impasse des Acacias, Lille', NULL, NULL, NULL, '2026-03-12 18:09:02', '2026-03-12 18:09:02'),
(19, 'Secretaire', 'secretaire@isig.fr', '$2b$10$gpRTGpa64USrxcE4kOiY3uQhxwyPtLD6NaxlNZ2Nf0lq6DleSR0dS', 'administratif', 'active', 'Dupuit', 'Mathilde', '0623366635', 'Paris', '2026-03-12 18:34:49', NULL, NULL, '2026-03-12 18:34:23', '2026-03-12 18:34:49');

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `avis_formation`
--
ALTER TABLE `avis_formation`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `unique_avis` (`id_etudiant`,`id_formation`),
  ADD KEY `id_formation` (`id_formation`);

--
-- Index pour la table `classe`
--
ALTER TABLE `classe`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_formation` (`id_formation`);

--
-- Index pour la table `contact`
--
ALTER TABLE `contact`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `cours`
--
ALTER TABLE `cours`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_cours_enseignant` (`id_enseignant`);

--
-- Index pour la table `cours_classe`
--
ALTER TABLE `cours_classe`
  ADD PRIMARY KEY (`id_cours`,`id_classe`),
  ADD KEY `id_classe` (`id_classe`);

--
-- Index pour la table `enseignant`
--
ALTER TABLE `enseignant`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `etudiant`
--
ALTER TABLE `etudiant`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_classe` (`id_classe`);

--
-- Index pour la table `formation`
--
ALTER TABLE `formation`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `note`
--
ALTER TABLE `note`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_note_etudiant` (`id_etudiant`),
  ADD KEY `fk_note_cours` (`id_cours`);

--
-- Index pour la table `salle`
--
ALTER TABLE `salle`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `numero` (`numero`);

--
-- Index pour la table `session`
--
ALTER TABLE `session`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_cours` (`id_cours`),
  ADD KEY `id_salle` (`id_salle`),
  ADD KEY `id_enseignant` (`id_enseignant`);

--
-- Index pour la table `session_etudiant`
--
ALTER TABLE `session_etudiant`
  ADD PRIMARY KEY (`id_session`,`id_etudiant`),
  ADD KEY `id_etudiant` (`id_etudiant`);

--
-- Index pour la table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `avis_formation`
--
ALTER TABLE `avis_formation`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT pour la table `classe`
--
ALTER TABLE `classe`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT pour la table `contact`
--
ALTER TABLE `contact`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT pour la table `cours`
--
ALTER TABLE `cours`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT pour la table `enseignant`
--
ALTER TABLE `enseignant`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT pour la table `etudiant`
--
ALTER TABLE `etudiant`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT pour la table `formation`
--
ALTER TABLE `formation`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT pour la table `note`
--
ALTER TABLE `note`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=94;

--
-- AUTO_INCREMENT pour la table `salle`
--
ALTER TABLE `salle`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT pour la table `session`
--
ALTER TABLE `session`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT pour la table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `avis_formation`
--
ALTER TABLE `avis_formation`
  ADD CONSTRAINT `avis_formation_ibfk_1` FOREIGN KEY (`id_etudiant`) REFERENCES `etudiant` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `avis_formation_ibfk_2` FOREIGN KEY (`id_formation`) REFERENCES `formation` (`id`) ON DELETE CASCADE;

--
-- Contraintes pour la table `classe`
--
ALTER TABLE `classe`
  ADD CONSTRAINT `classe_ibfk_1` FOREIGN KEY (`id_formation`) REFERENCES `formation` (`id`) ON DELETE CASCADE;

--
-- Contraintes pour la table `cours`
--
ALTER TABLE `cours`
  ADD CONSTRAINT `fk_cours_enseignant` FOREIGN KEY (`id_enseignant`) REFERENCES `enseignant` (`id`) ON DELETE CASCADE;

--
-- Contraintes pour la table `cours_classe`
--
ALTER TABLE `cours_classe`
  ADD CONSTRAINT `cours_classe_ibfk_1` FOREIGN KEY (`id_cours`) REFERENCES `cours` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `cours_classe_ibfk_2` FOREIGN KEY (`id_classe`) REFERENCES `classe` (`id`) ON DELETE CASCADE;

--
-- Contraintes pour la table `etudiant`
--
ALTER TABLE `etudiant`
  ADD CONSTRAINT `etudiant_ibfk_1` FOREIGN KEY (`id_classe`) REFERENCES `classe` (`id`) ON DELETE SET NULL;

--
-- Contraintes pour la table `note`
--
ALTER TABLE `note`
  ADD CONSTRAINT `fk_note_cours` FOREIGN KEY (`id_cours`) REFERENCES `cours` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `fk_note_etudiant` FOREIGN KEY (`id_etudiant`) REFERENCES `etudiant` (`id`) ON DELETE CASCADE;

--
-- Contraintes pour la table `session`
--
ALTER TABLE `session`
  ADD CONSTRAINT `session_ibfk_1` FOREIGN KEY (`id_cours`) REFERENCES `cours` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `session_ibfk_2` FOREIGN KEY (`id_salle`) REFERENCES `salle` (`id`) ON DELETE SET NULL,
  ADD CONSTRAINT `session_ibfk_3` FOREIGN KEY (`id_enseignant`) REFERENCES `enseignant` (`id`) ON DELETE CASCADE;

--
-- Contraintes pour la table `session_etudiant`
--
ALTER TABLE `session_etudiant`
  ADD CONSTRAINT `session_etudiant_ibfk_1` FOREIGN KEY (`id_session`) REFERENCES `session` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `session_etudiant_ibfk_2` FOREIGN KEY (`id_etudiant`) REFERENCES `etudiant` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
