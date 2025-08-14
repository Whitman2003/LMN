-- Out of Date Drop
DROP DATABASE IF EXISTS LMN;

-- Create the Database
Create Database IF NOT EXISTS LMN;
USE LMN;

-- Init Creations

-- Users Table
Create Table IF NOT EXISTS tblUsers (
    UserID CHAR(36) PRIMARY KEY,
    UserName VARCHAR(100) NOT NULL,
    UserEmail VARCHAR(100) NOT NULL UNIQUE,
    UserPassword VARCHAR(100) NOT NULL,
    UserPhone VARCHAR(15),
    SessionID CHAR(36),
    CreatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Sessions Table
Create Table IF NOT EXISTS tblSessions (
    SessionID CHAR(36) PRIMARY KEY,
    UserID CHAR(36) NOT NULL,
    CreatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    ExpiresAt TIMESTAMP,
    FOREIGN KEY (UserID) REFERENCES tblUsers(UserID) ON DELETE CASCADE
);