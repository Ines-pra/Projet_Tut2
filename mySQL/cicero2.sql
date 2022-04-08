-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1
-- Généré le : jeu. 07 avr. 2022 à 07:41
-- Version du serveur : 10.4.22-MariaDB
-- Version de PHP : 8.1.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `cicero2`
--

-- --------------------------------------------------------

--
-- Structure de la table `case_af`
--

CREATE TABLE `case_af` (
  `id` int(11) NOT NULL,
  `description` varchar(300) NOT NULL,
  `startedAt` datetime NOT NULL,
  `status` tinyint(1) NOT NULL,
  `endedAt` datetime NOT NULL,
  `code` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `case_af`
--

INSERT INTO `case_af` (`id`, `description`, `startedAt`, `status`, `endedAt`, `code`) VALUES
(1, 'Affaire du labo de méthamphétamine', '2022-03-31 22:43:47', 0, '2022-03-31 22:43:47', 'CR/sds58'),
(2, 'Affaire de vol et cleptomanie', '2022-03-31 22:43:47', 0, '2022-03-31 22:43:47', 'CR/lofd15'),
(3, 'Affaire de complicité dans une entreprise illégale', '2022-03-31 22:43:47', 0, '2022-03-31 22:43:47', 'CR/5ds74s'),
(4, 'Affaire de dirigeant et collaboration d\'une entreprise illégale', '2022-03-31 22:43:47', 0, '2022-03-31 22:43:47', 'CR/58vcx7'),
(5, 'Affaire sur violence aggravé, recèle et stupéfiant ', '2022-03-31 22:43:47', 0, '2022-03-31 22:43:47', 'CR/yts2025'),
(6, 'Affaire de séquestration en lien avec une entreprise illégale', '2022-03-31 22:43:47', 1, '2022-04-06 19:16:13', 'CR/kfros78');

-- --------------------------------------------------------

--
-- Structure de la table `client`
--

CREATE TABLE `client` (
  `id` int(11) NOT NULL,
  `lastname` varchar(50) NOT NULL,
  `firstname` varchar(50) NOT NULL,
  `address` varchar(150) NOT NULL,
  `birthDate` date NOT NULL,
  `createdDate` date NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `client`
--

INSERT INTO `client` (`id`, `lastname`, `firstname`, `address`, `birthDate`, `createdDate`) VALUES
(1, 'White', 'Walter', '1919 Old Town Rd NW, Albuquerque, NM 87104, États-Unis', '1973-04-20', '2022-04-06'),
(2, 'Pinkman', 'Jesse', '322 16th street sw\r\nalbuquerque, new mexico 87104', '1990-04-06', '2022-04-06'),
(3, 'White', 'Skyler', '1919 Old Town Rd NW, Albuquerque, NM 87104, États-Unis', '1972-04-13', '2022-04-06'),
(4, 'Fring', 'Gus', '12000 – 12100 Coors Rd SW, Albuquerque, New Mexico 87045', '1972-02-15', '2022-04-06'),
(5, 'Salamanca', 'Tuco', 'Dalies Rd, Los Lunas, NM 87031', '1972-01-18', '2022-04-06'),
(6, 'Babineaux', 'Huell', '2566 Old Town Rd NW, Albuquerque, NM 87104, États-Unis', '1992-04-09', '2022-04-06'),
(7, 'Ehrmantraut', 'Mike', '6688 Old Town Rd NW, Albuquerque, NM 87104, États-Unis', '1976-08-13', '2022-04-06'),
(8, 'Rodarte-Quayle', 'Lydia', '1011 Las Lomas Rd NE, Albuquerque, NM 87102', '1994-10-13', '2022-04-06'),
(9, 'Schrader', 'Marie', '4901 Cumbre Del Sur Court NE, Albuquerque, New Mexico 87106', '2012-04-13', '2022-04-06'),
(10, 'Kitt', 'Tyrus', '7881 Cumbre Del Sur Court NE, Albuquerque, New Mexico 87106', '1992-04-13', '2022-04-06'),
(11, 'Hector', 'Salamanca', '8799 Evergreen Terasse, Kentucky', '1930-12-04', '2022-04-07');

-- --------------------------------------------------------

--
-- Structure de la table `eq_client_case`
--

CREATE TABLE `eq_client_case` (
  `caseAfId` int(11) NOT NULL,
  `clientId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `eq_client_case`
--

INSERT INTO `eq_client_case` (`caseAfId`, `clientId`) VALUES
(1, 1),
(1, 2),
(2, 9),
(3, 1),
(3, 2),
(3, 3),
(3, 7),
(3, 10),
(4, 4),
(4, 8),
(5, 5),
(6, 7),
(6, 10);

-- --------------------------------------------------------

--
-- Structure de la table `event`
--

CREATE TABLE `event` (
  `id` int(11) NOT NULL,
  `description` varchar(300) NOT NULL,
  `createdDate` datetime NOT NULL,
  `duration` int(11) NOT NULL,
  `idCase` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `case_af`
--
ALTER TABLE `case_af`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `client`
--
ALTER TABLE `client`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `eq_client_case`
--
ALTER TABLE `eq_client_case`
  ADD PRIMARY KEY (`caseAfId`,`clientId`),
  ADD KEY `clientId` (`clientId`);

--
-- Index pour la table `event`
--
ALTER TABLE `event`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idCase` (`idCase`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `case_af`
--
ALTER TABLE `case_af`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT pour la table `client`
--
ALTER TABLE `client`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT pour la table `event`
--
ALTER TABLE `event`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `eq_client_case`
--
ALTER TABLE `eq_client_case`
  ADD CONSTRAINT `eq_client_case_ibfk_1` FOREIGN KEY (`caseAfId`) REFERENCES `case_af` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `eq_client_case_ibfk_2` FOREIGN KEY (`clientId`) REFERENCES `client` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `event`
--
ALTER TABLE `event`
  ADD CONSTRAINT `event_ibfk_1` FOREIGN KEY (`idCase`) REFERENCES `case_af` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
