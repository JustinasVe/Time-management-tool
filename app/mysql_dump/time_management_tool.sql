-- MySQL dump 10.13  Distrib 8.0.31, for Win64 (x86_64)
--
-- Host: localhost    Database: time_management_tool
-- ------------------------------------------------------
-- Server version	8.0.31

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `calculations`
--

DROP TABLE IF EXISTS `calculations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `calculations` (
  `id` int NOT NULL AUTO_INCREMENT,
  `projectHours` int NOT NULL,
  `deadline` date NOT NULL,
  `commitments` int NOT NULL,
  `maxDailyHours` int NOT NULL,
  `userId` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `userId_idx` (`userId`),
  CONSTRAINT `userId` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `calculations`
--

LOCK TABLES `calculations` WRITE;
/*!40000 ALTER TABLE `calculations` DISABLE KEYS */;
INSERT INTO `calculations` VALUES (1,100,'2023-07-07',20230707,1,1),(2,200,'2023-07-07',20230707,2,2),(3,300,'2023-07-03',20230702,3,3),(25,777,'2023-06-13',72,8,25);
/*!40000 ALTER TABLE `calculations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `email` varchar(100) NOT NULL,
  `password` varchar(60) NOT NULL,
  `name` varchar(60) NOT NULL,
  `surname` varchar(60) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email_UNIQUE` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'vienas@gmail.com','test123','vienas','vienas'),(2,'du@gmail.com','test123','du','du'),(3,'trys@gmail.com','test123','trys','trys'),(4,'benas@gmail.com','$2b$12$jf9YPxQ7DYa21DzGI4/Igu4joEvm6vI40TsTM/6i430Z1SrEinzgi','Benas','benas'),(5,'','$2b$12$Y3o/9mI0im/Joi7RccHfXOQyBLWeLY0C3phzGiwuKUAxefm1haeUa','',''),(12,'test@gmail.com','$2b$12$giOVvsnLsjK0ITy8xNz6/.wDXCSEbUewWKaqGimgt2zP6kNb1AqX2','test','test'),(15,'testa@gmail.com','$2b$12$ueuvP4gC5Gaan4iIsM6qXeGEtv17N/f3OGaGGnPdclwHMJfs5Oe1q','testa','test'),(16,'qw@gmail.com','$2b$12$D8LxC3Pet3lWCWBWkrhPAOUMsgx6pjBmEwgqI0M8y7LHqsA.ipoIK','qw','qw'),(24,'q@gmail.com','$2b$12$sFFrGwzEvvvL.iXF74F/PeF1PcdCXqBL58yIIcWUG0CSzkwXflEzG','q','q'),(25,'a@a','$2b$12$1uZxW8ioZRT3l79I8raBn..0cqJbj4agLw3tt.NlrRc035gQOtUsG','a','a');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-06-09  6:43:20
