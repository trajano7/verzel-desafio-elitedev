CREATE TABLE User (
    UserID VARCHAR(36) PRIMARY KEY,
    Username VARCHAR(20) UNIQUE,
    PasswordHash CHAR(64)
);

CREATE TABLE Movie (
    MovieID BIGINT PRIMARY KEY,
    Title VARCHAR(255),  
    Overview TEXT,
    ReleaseDate DATETIME,  
    Rating DECIMAL(5,4)
);

CREATE TABLE Favorite (
    UserID VARCHAR(36),
    MovieID BIGINT,
    FOREIGN KEY (UserID) REFERENCES User(UserID),  
    FOREIGN KEY (MovieID) REFERENCES Movie(MovieID),  
    PRIMARY KEY (UserID, MovieID)  
);