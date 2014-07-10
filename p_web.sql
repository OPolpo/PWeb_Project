CREATE DATABASE  IF NOT EXISTS `p_web` /*!40100 DEFAULT CHARACTER SET latin1 */;
USE `p_web`;
-- MySQL dump 10.13  Distrib 5.6.13, for osx10.6 (i386)
--
-- Host: 127.0.0.1    Database: p_web
-- ------------------------------------------------------
-- Server version	5.5.33

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `criterion`
--

DROP TABLE IF EXISTS `criterion`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `criterion` (
  `id_criterion` int(11) NOT NULL AUTO_INCREMENT,
  `description` text,
  `coefficient_name` text,
  `id_entity_type_ref` int(11) NOT NULL,
  PRIMARY KEY (`id_criterion`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `criterion`
--

LOCK TABLES `criterion` WRITE;
/*!40000 ALTER TABLE `criterion` DISABLE KEYS */;
INSERT INTO `criterion` VALUES (1,'Indubbia Somiglianza magari si modifica','Cavaliere',2),(2,'Possiede Mossa','Mossa',2),(3,'Possiede Armatura','Armatura',2);
/*!40000 ALTER TABLE `criterion` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `entity`
--

DROP TABLE IF EXISTS `entity`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `entity` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `type_ref` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=214 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `entity`
--

LOCK TABLES `entity` WRITE;
/*!40000 ALTER TABLE `entity` DISABLE KEYS */;
INSERT INTO `entity` VALUES (0,1),(1,1),(51,2),(52,2),(53,2),(54,2),(55,2),(56,2),(57,2),(58,2),(59,2),(60,2),(61,2),(62,2),(63,2),(64,2),(65,2),(66,2),(67,2),(68,2),(69,2),(70,2),(100,3),(101,3),(102,3),(103,3),(104,3),(105,3),(106,3),(107,3),(108,3),(109,3),(110,3),(111,3),(112,3),(113,3),(114,3),(115,3),(116,3),(117,3),(118,3),(119,3),(120,3),(121,3),(122,3),(123,3),(124,3),(125,3),(126,3),(127,3),(128,3),(129,3),(130,3),(131,3),(132,3),(133,3),(201,4),(202,4),(203,4),(204,4),(205,4),(206,4),(207,4),(208,4),(209,4),(210,4),(211,4),(212,4),(213,4);
/*!40000 ALTER TABLE `entity` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `entity_property`
--

DROP TABLE IF EXISTS `entity_property`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `entity_property` (
  `id_entity` int(11) NOT NULL,
  `id_property` int(11) NOT NULL,
  `value_property` text,
  PRIMARY KEY (`id_entity`,`id_property`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `entity_property`
--

LOCK TABLES `entity_property` WRITE;
/*!40000 ALTER TABLE `entity_property` DISABLE KEYS */;
INSERT INTO `entity_property` VALUES (0,0,NULL),(0,1,'dummy_node'),(1,1,'Birbone...'),(1,2,'Perché hai cercato patata!?'),(51,1,'Pegasus Seiya'),(51,2,'Pegasus è il primo dei cinque cavalieri di Atena, ed è protetto dall’omonima costellazione.'),(51,3,'13'),(51,4,'1.65'),(51,5,'53'),(51,6,'B'),(51,7,'Grande tempio di Atene'),(52,1,'Crystal il cigno'),(52,2,'Figlio di un padre giapponese e di una madre russa, Crystal è il guerriero dei ghiacci ed appartiene alla costellazione del Cigno.'),(52,3,'14'),(52,4,'1.73'),(52,5,'60'),(52,6,'0'),(52,7,'Siberia Orientale'),(53,1,'Sirio il Dragone'),(53,2,'Cavaliere della costellazione del Dragone ed amico fraterno di Pegasus, Sirio è il più saggio e riflessivo fra i cinque eroi, ma ha comunque una natura indomita e combattiva.'),(53,3,'14'),(53,4,'1.72'),(53,5,'53'),(53,6,'A'),(53,7,'5 Picchi, Cina'),(54,1,'Andromeda'),(54,2,'Dei cinque Cavalieri di Atena, Andromeda è il più giovane ed emotivo, ma ciò non significa che non sia un difficile avversario per qualsiasi nemico.'),(54,3,'13'),(54,4,'1.65'),(54,5,'51'),(54,6,'A'),(54,7,'Isola Di Andromeda'),(55,1,'Phoenix'),(55,2,'Cavaliere della costellazione della Fenice, Phoenix è il fratello maggiore di Andromeda ed è dotato di una forza incredibile.'),(55,3,'15'),(55,4,'1.75'),(55,5,'62'),(55,6,'AB'),(55,7,'Isola della Regina Nera (Sud Pacifico)'),(56,1,'Asher'),(56,2,'Il suo nome giapponese significa \"cucciolotto perverso\".\nE\' molto devoto a Saori, al punto da voler diventare il suo cagnolino-schiavetto.'),(56,3,'13'),(56,4,'1.65'),(56,5,'65'),(56,6,'B'),(56,7,'Orano, Algeria'),(57,1,'Aspides'),(57,2,'E\' stato sconfitto nel terzo episodio da Hyoga.\nHa gli occhi completamente neri e una lunga cresta di capelli bianchi: molto particolare.'),(57,3,'14'),(57,4,'1.70'),(57,5,'56'),(57,6,'B'),(57,7,'Lago di Holts, Finlandia'),(58,1,'Black il lupo'),(58,2,'Non ha mai la possibilità di combattere, neanche durante il torneo, in quanto Phoenix gli ha subito lanciato un fantasma diabolico, stendendolo al primo colpo.'),(58,3,'14'),(58,4,'1.71'),(58,5,'57'),(58,6,'AB'),(58,7,'Bomihillis, Liberia'),(59,1,'Ban'),(59,2,'E\' stato subito sconfitto da Jabu l\'Unicorno all\'inizio della serie.\nDi corporatura è quasi grosso come Geki l\'Orso e di capelli è bruno.'),(59,3,'15'),(59,4,'1.81'),(59,5,'83'),(59,6,'B'),(59,7,'Kilimanjaro, Tanzania'),(60,1,'Geki'),(60,2,'Si è addestrato in Canada strangolando gli orsi, in quanto la sua costellazione è l\'Orsa Maggiore.\nE\' il più grosso dei Bronze Saint, ma è stato ugualmente sconfitto da Seiya durante il torneo.'),(60,3,'15'),(60,4,'1.88'),(60,5,'102'),(60,6,'A'),(60,7,'Montagne Rocciose, Canada'),(61,1,'Nemes'),(61,2,'Sacerdotessa guerriera dell’isola di Andromeda ed innamorata dello stesso Andromeda, Nemes vorrebbe evitargli le difficili prove che lo attendono per diventare cavaliere, ma allo stesso tempo lo esorta ad andare avanti per non infrangere la promessa fatta a Phoenix di ritornare a Nuova Luxor cavaliere.'),(61,3,'14'),(61,4,'1.60'),(61,5,'45'),(61,6,'0'),(61,7,'Isola di Andromeda'),(62,1,'Pegasus Nero'),(62,2,'Sosia perfetto di Pegasus, Pegasus nero è il primo ad affrontare i cavalieri di Atena, ma con scarsi risultati, almeno inizialmente.'),(62,3,'15'),(62,4,'1.70'),(62,5,'58'),(62,6,'B'),(62,7,'Isola della Regina Nera'),(63,1,'Dragone Nero'),(63,2,'E\' il capo degli altri tre cavalieri neri agli ordini di Phoenix ed ovviamente anche il più forte.'),(63,3,'15'),(63,4,'1.73'),(63,5,'62'),(63,6,'A'),(63,7,'Isola della Regina Nera'),(64,1,'Cigno Nero'),(64,2,'Cigno Nero è il primo ad apparire dei quattro cavalieri neri. Egli infatti attacca Andromeda in un parco dove il cavaliere si era recato per cercare tracce del fratello Phoenix.'),(64,3,'15'),(64,4,'1.73'),(64,5,'61'),(64,6,'0'),(64,7,'Isola della Regina Nera'),(65,1,'Andromeda Nero'),(65,2,'Andromeda nero è il terzo dei cavalieri neri a combattere, ed attacca Andromeda che sta cercando di salvare Pegasus, caduto in un crepaccio. '),(65,3,'14'),(65,4,'1.70'),(65,5,'58'),(65,6,'B'),(65,7,'Isola della Regina Nera'),(66,1,'Phoenix Nero'),(66,2,'Le Ombre di Ikki sono gli scagnozzi di Phoenix e non sono dei veri e propri cavalieri in quanto non hanno colpi segreti.'),(66,3,'15'),(66,4,'1.73'),(66,5,'63'),(66,7,'Isola della Regina Nera'),(67,1,'Jango'),(67,2,'Jango è un cavaliere dell\'Isola della Regina Nera, ma  non è mai riuscito a ottenere l\'armatura della Fenice.'),(67,3,'18'),(67,4,'1.88'),(67,5,'101'),(67,6,'B'),(67,7,'Isola della Regina Nera'),(68,1,'Guilty'),(68,2,'Il suo nome significa \"reo\" ed è stato il maestro di Ikki'),(68,4,'1.92'),(68,5,'91'),(68,6,'A'),(68,7,'Isola della Regina Nera'),(100,1,'Fulmine di Pegasus'),(100,2,'Dopo aver tracciato per aria con le braccia le 13 stelle di Pegasus, Pegasus scaglia centinaia di pugni alla velocità del suono.'),(101,1,'Spirale di Pegasus'),(101,2,'Pegasus, tramite una presa, afferra l\'avversario da dietro e salta insieme a lui facendolo cadere di testa.'),(102,1,'Meteora di Pegasus '),(102,2,'Pegasus riunisce tutti i suoi colpi in un\'unica sfera di energia, che compare all\'improvviso annientando l\'avversario.'),(103,1,'Fulmine di Pegasus Nero'),(103,2,'E\' come il Fulmine di Pegasus, con la differenza che, se vieni colpito, devi subire la Morte Nera: il corpo ti si riempie di macchie marroni che si espandono fino a contaminare anche il sangue e farti morire.'),(104,1,'Colpo del Drago Nascente'),(104,2,'Ha la potenza di far invertire il corso di una cascata. Sirio può lanciare questo colpo solo quando può invertire il corso del suo sangue. Il punto debole è che il cuore, durante l\'attacco, rimane scoperto.'),(105,1,'Colpo del Drago'),(105,2,'E\' un colpo estremo, che permette di raggiungere la pienezza del Dragone. Dato che è potentissimo, chi lo scaglia è destinato a morire salendo nello spazio..'),(106,1,'Colpo Segreto del Drago Nascente'),(106,2,'E\' una variante più forte del Colpo del Drago Nascente.'),(107,1,'Polvere di Diamanti'),(107,2,'Crystal lancia tanti cristalli di ghiaccio che congelano all\'istante il nemico.'),(108,1,'Aurora del Nord'),(108,2,'E\' una versione più potente della Polvere di Diamanti: Crystal sbatte le braccia come se fossero delle ali, lancia due pugni verso il cielo, poi due verso il nemico, infine unisce le mani e scaglia due volte il colpo.'),(109,1,'Anello del Cigno'),(109,2,'Sono degli anelli di ghiaccio che possono o avvolgere il nemico immobilizzandolo o avvolgere Crystal stesso per difenderlo dai colpi dell\'avversario.'),(110,1,'Esecuzione di Aurora - Per il Sacro Acquario'),(110,2,'E\' un colpo imparato da Aquarius (Camus), con cui raggiunge lo zero assoluto (-273,15 °C), cioè la temperatura estrema, sotto la quale non si può scendere. Crystal unisce in alto le braccia, le abbassa e poi scaglia il colpo.'),(111,1,'Tifone di Gelo'),(111,2,'Nel manga, l\'Aurora del Nord si chiama così.'),(112,1,'Catena di Andromeda'),(112,2,'Con questo comando, le catene si muovono o per trovare un nemico nascosto o per aggrapparsi a qualche spuntone di roccia o per fare altri movimenti.'),(113,1,'Nebulosa di Andromeda'),(113,2,'Questo colpo si raggiunge col settimo senso ed è una bufera ampia e fatale come l\'intero universo.'),(114,1,'Corrente della Nebulosa'),(114,2,'E\' una variante più debole della Nebulosa di Andromeda: il vento è meno forte, ma riesce a immobilizzare il nemico.'),(115,1,'Onda del Tuono'),(115,2,'E\' una tecnica di attacco: le catene cercano il nemico, lo trovano anche se è distante e lo colpiscono.'),(116,1,'Difesa Circolare'),(116,2,'Le catene si dispongono a spirale intorno a Shun e nessun nemico le può attraversare in quanto creano un campo elettico.'),(117,1,'Ragnatela'),(117,2,'E\' un colpo inventato contro Kira (Io) per difendersi dalla Libellula.'),(118,1,'Rete della Pace'),(118,2,'E\' un colpo inventato contro Io per difendersi dall\' Aquila.'),(119,1,'Condotto a Spirale '),(119,2,'E\' un colpo inventato contro Io per difendersi dal Serpente.'),(120,1,'Boomerang'),(120,2,'E\' un colpo inventato contro Io per difendersi dai Vampiri.'),(121,1,'Trappola per Animali'),(121,2,'E\' un colpo inventato contro Io per difendersi dal Lupo.'),(122,1,'Grande Cattura'),(122,2,'E\' un colpo inventato contro Io per difendersi dall\'Orso.'),(123,1,'Fantasma diabolico'),(123,2,'Phoenix lancia un pugno indolore che entra nel cervello del nemico, causandogli degli incubi e paralizzando i gangli nervosi..'),(124,1,'Ali Della Fenice'),(124,2,'Phoenix, con due pugni, lancia una ventata di aria infuocata.'),(125,1,'Galoppo/Criniera dell\'Unicorno'),(125,2,'Jabu galoppa verso l\'avversario'),(126,1,'Attacco delle Zanne Avvelenate'),(126,2,'Ichi inietta il veleno dell\'Idra tramite gli artigli retrattili della sua armatura, posti sui polsi e sulle gambe'),(127,1,'Death Howling'),(127,2,'E\' un colpo che non si è mai visto nel cartone.'),(128,1,'Lionet Bomber'),(128,2,'In quelle pochissime volte che combatte, non pronuncia mai la formula in italiano.'),(129,1,'Stretta Dell\' Orsa'),(129,2,'Geki ti prende per il collo, ti solleva e ti strangola, così come faceva con gli orsi in Canada.'),(130,1,'Tormenta Nera'),(130,2,'E\' come la Polvere di Diamanti di Crystal, con la differenza che la neve è nera e ghiaccia solo la superficie degli oggetti.'),(131,1,'Nebulosa dalle Zanne Nere'),(131,2,'La sua catena si trasforma in tanti serpenti che ti mordono.'),(132,1,'Fantasma Diabolico'),(132,2,'E\' come il colpo di Ikki, con la differenza che non rimangono paralizzati solo i nervi, ma anche tutto il corpo, in quanto Phoenix Nero ti strangola coi suoi artigli'),(133,1,'Pugno infuocato '),(133,2,'Jango di lancia una vampata di fiamme'),(201,1,'Armatura Di Pegasus'),(201,8,'Grecia, al grande tempio'),(201,9,'Bronzo'),(202,1,'Armatura Del Dragone'),(202,8,'sotto la cascata dei Cinque Picchi, in Cina'),(202,9,'Bronzo'),(203,1,'Armatura Del Cigno'),(203,8,'posta fra i ghiacci della Siberia'),(203,9,'Bronzo'),(204,1,'Armatura Di Andromeda'),(204,8,'sull\'omonima isola, nell\'Atlantico'),(204,9,'Bronzo'),(205,1,'Armatura della Fenice'),(205,8,'Nell\'Isola della regina nera, nel pacifico del sud'),(205,9,'Bronzo'),(206,1,'Armatura dell\'Unicorno'),(206,8,'Algeria'),(206,9,'Bronzo'),(207,1,'Armatura dell\'Orsa Minore'),(207,8,'Canada'),(207,9,'Bronzo'),(208,1,'Armatura del lupo'),(208,8,'Liberia'),(208,9,'Bronzo'),(209,1,'Armatura di Aspides'),(209,8,'Finlandia'),(209,9,'Bronzo'),(210,1,'Armatura del leone minore'),(210,8,'Tanzania'),(210,9,'Bronzo'),(211,1,'Armatura di Nemes'),(211,8,'Isola Di Andromeda'),(211,9,'Bronzo'),(212,1,'Armatura di Reda'),(212,8,'Isola Di Andromeda'),(212,9,'Bronzo'),(213,1,'Armatura di Sanzius'),(213,8,'Isola Di Andromeda'),(213,9,'Bronzo');
/*!40000 ALTER TABLE `entity_property` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `entity_type`
--

DROP TABLE IF EXISTS `entity_type`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `entity_type` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` text NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `entity_type`
--

LOCK TABLES `entity_type` WRITE;
/*!40000 ALTER TABLE `entity_type` DISABLE KEYS */;
INSERT INTO `entity_type` VALUES (1,'mio_tipo'),(2,'cavaliere'),(3,'mossa'),(4,'armatura');
/*!40000 ALTER TABLE `entity_type` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `property_type`
--

DROP TABLE IF EXISTS `property_type`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `property_type` (
  `id` int(11) NOT NULL,
  `name_property` varchar(20) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `property_type`
--

LOCK TABLES `property_type` WRITE;
/*!40000 ALTER TABLE `property_type` DISABLE KEYS */;
INSERT INTO `property_type` VALUES (1,'name'),(2,'descrizione'),(3,'eta'),(4,'altezza'),(5,'peso'),(6,'Gruppo sanguino'),(7,'Località di Addestra'),(8,'Luogo Custodia'),(9,'tipologia');
/*!40000 ALTER TABLE `property_type` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `similarity`
--

DROP TABLE IF EXISTS `similarity`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `similarity` (
  `id_entitystart` int(11) NOT NULL,
  `id_entityend` int(11) NOT NULL,
  `id_criterion` int(11) NOT NULL,
  `value` float NOT NULL,
  PRIMARY KEY (`id_entitystart`,`id_entityend`,`id_criterion`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `similarity`
--

LOCK TABLES `similarity` WRITE;
/*!40000 ALTER TABLE `similarity` DISABLE KEYS */;
INSERT INTO `similarity` VALUES (51,62,1,0.8),(51,100,2,0.6),(51,101,2,0.7),(51,102,2,0.3),(51,201,3,0.1),(52,64,1,0.4),(52,107,2,0.9),(52,108,2,0.3),(52,109,2,0.3),(52,110,2,0.2),(52,111,2,0.6),(52,203,3,1),(53,63,1,0.8),(53,104,2,1),(53,105,2,0.4),(53,106,2,0.6),(53,202,3,0.8),(54,65,1,0.3),(54,112,2,0.8),(54,113,2,0.2),(54,114,2,1),(54,115,2,0.8),(54,116,2,1),(54,117,2,0.3),(54,118,2,0.7),(54,119,2,0.9),(54,120,2,0.3),(54,121,2,0.5),(54,122,2,0.9),(54,204,3,0.4),(55,66,1,0.5),(55,123,2,0.7),(55,124,2,0.9),(55,205,3,1),(56,125,2,1),(56,206,3,1),(57,126,2,0.3),(57,207,3,1),(58,127,2,0.8),(58,208,3,1),(59,128,2,1),(59,209,3,0.6),(60,129,2,1),(60,210,3,1),(61,211,3,1),(62,103,2,0.9),(64,130,2,1),(65,131,2,1),(66,132,2,1),(67,133,2,1);
/*!40000 ALTER TABLE `similarity` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tag`
--

DROP TABLE IF EXISTS `tag`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tag` (
  `id_entity` int(11) NOT NULL,
  `tag_value` varchar(45) NOT NULL,
  PRIMARY KEY (`id_entity`,`tag_value`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tag`
--

LOCK TABLES `tag` WRITE;
/*!40000 ALTER TABLE `tag` DISABLE KEYS */;
INSERT INTO `tag` VALUES (1,'BOH'),(1,'Centrale'),(1,'patata'),(1,'simpson'),(2,'Religiosi'),(3,'simpson'),(4,'simpson'),(5,'simpson'),(6,'simpson'),(7,'simpson'),(8,'simpson'),(9,'simpson'),(10,'simpson'),(11,'BOH'),(11,'Centrale'),(11,'simpson'),(12,'Religiosi'),(12,'simpson'),(13,'Religiosi'),(13,'simpson'),(14,'Religiosi'),(14,'simpson'),(15,'BOH'),(15,'simpson'),(16,'BOH'),(16,'Centrale'),(16,'simpson'),(17,'simpson'),(18,'simpson'),(19,'simpson'),(20,'simpson'),(21,'simpson'),(51,'bronzo'),(52,'bronzo'),(53,'bronzo'),(54,'bronzo'),(55,'bronzo'),(56,'bronzo'),(57,'bronzo'),(58,'bronzo'),(59,'bronzo'),(60,'bronzo'),(61,'bronzo'),(62,'nero'),(63,'nero'),(64,'nero'),(65,'nero'),(66,'nero'),(67,'nero'),(68,'nero');
/*!40000 ALTER TABLE `tag` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2014-07-10 23:09:59
