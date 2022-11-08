CREATE DATABASE dappsy;
USE dappsy;

CREATE TABLE `Users` (
  id int NOT NULL auto_increment,
  address varchar(255),  
  name varchar(200),
  lastname VARCHAR(200) NULL,
  location VARCHAR(255) NOT NULL,
  locationDetails VARCHAR(255),
  cellphone VARCHAR(100), 
  email VARCHAR(100),
  `website` VARCHAR(100),
  twitter DECIMAL,
  created_at datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
);

CREATE TABLE ProjectStatus (
    id int NOT NULL auto_increment,
    name varchar(100),
    description varchar(100),
    PRIMARY KEY (id)
);

CREATE TABLE Projects (
    id int NOT NULL auto_increment,
    ownerId int NOT NULL,
    statusId int NOT NULL,
    name varchar(255) NOT NULL,
    description varchar(255) NOT NULL,
    location varchar(255), 
    price float NOT NULL,
    tokenCount int NOT NULL,
    PRIMARY KEY (id),
    created_at datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
    KEY `FK_Projects_User` (`ownerId`),
    CONSTRAINT `FK_Projects_User` FOREIGN KEY (`ownerId`) REFERENCES `Users` (`id`),
    KEY `FK_Projects_ProjectStatus` (`statusId`),
    CONSTRAINT `FK_Projects_ProjectStatus` FOREIGN KEY (`statusId`) REFERENCES `ProjectStatus` (`id`)
);

CREATE TABLE ProjectDocuments (
    id int NOT NULL auto_increment,
    projectId int NOT NULL,
    `uri` VARCHAR(255) NOT NULL,
    name VARCHAR(255) NOT NULL,
    description VARCHAR(255) NOT NULL,
    created_at datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    KEY `FK_ProjectDocuments_Project` (`projectId`),
    CONSTRAINT `FK_ProjectDocuments_Project` FOREIGN KEY (`projectId`) REFERENCES `Projects` (`id`)
);

CREATE TABLE Transactions (
    id int NOT NULL auto_increment,    
    projectId int NOT NULL,
    sellerId int NOT NULL,
    buyerId int NOT NULL,
    tokenCount int NOT NULL,
    created_at datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    KEY `FK_Transactions_Project` (`projectId`),
    CONSTRAINT `FK_Transactions_Project` FOREIGN KEY (`projectId`) REFERENCES `Projects` (`id`),
    KEY `FK_TransactionsSeller_User` (`sellerId`),
    CONSTRAINT `FK_TransactionsSeller_User` FOREIGN KEY (`sellerId`) REFERENCES `Users` (`id`),
    KEY `FK_TransactionsBuyer_User` (`buyerId`),
    CONSTRAINT `FK_TransactionsBuyer_User` FOREIGN KEY (`buyerId`) REFERENCES `Users` (`id`)
);