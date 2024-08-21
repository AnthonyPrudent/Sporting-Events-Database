/*
Names : Abdulelah Alanazi - Mei Murakami -  Anthony Prudent
DESC: This SQL script creates and defines the structure of tables for a sports management database. 
The database keeps track of various sports, venues, players, teams, events, streaming services, and leagues.
*/

SET FOREIGN_KEY_CHECKS=0;
SET AUTOCOMMIT = 0;

/*
Create object tables
*/

-- Sports Table
CREATE OR REPLACE TABLE Sports (
    SportID INT AUTO_INCREMENT  NOT NULL PRIMARY KEY,
    Name VARCHAR(255) NOT NULL,
    RulesManual TEXT NOT NULL,
    Description TEXT NOT NULL
);

-- Venues Table
CREATE OR REPLACE TABLE Venues (
    VenueID INT AUTO_INCREMENT  NOT NULL PRIMARY KEY,
    Name VARCHAR(255) NOT NULL,
    Country VARCHAR(255) NOT NULL,
    State VARCHAR(255) NOT NULL,
    City VARCHAR(255) NOT NULL,
    Capacity INT NOT NULL
);

-- Teams Table
CREATE OR REPLACE TABLE Teams (
    TeamID INT AUTO_INCREMENT  NOT NULL PRIMARY KEY,
    Name VARCHAR(255) NOT NULL,
    Coach VARCHAR(255) NOT NULL,
    SportID INT NOT NULL,
    FOREIGN KEY (SportID) REFERENCES Sports(SportID) ON DELETE CASCADE
);

-- Players Table
CREATE OR REPLACE TABLE Players (
    PlayerID INT AUTO_INCREMENT  NOT NULL PRIMARY KEY,
    Name VARCHAR(255) NOT NULL,
    Position VARCHAR(255) NOT NULL,
    TeamID INT NOT NULL,
    FOREIGN KEY (TeamID) REFERENCES Teams(TeamID) ON DELETE CASCADE
);

-- Leagues Table
CREATE OR REPLACE TABLE Leagues (
    LeagueID INT AUTO_INCREMENT  NOT NULL PRIMARY KEY,
    Name VARCHAR(255) NOT NULL,
    YearFounded INT NOT NULL,
    Commisioner VARCHAR(255) NOT NULL,
    SportID INT NOT NULL,
    FOREIGN KEY (SportID) REFERENCES Sports(SportID) ON DELETE CASCADE
);

-- Events Table
CREATE OR REPLACE TABLE Events (
    EventID INT AUTO_INCREMENT  NOT NULL PRIMARY KEY,
    Name VARCHAR(255) NOT NULL,
    Date DATETIME NOT NULL,
    VenueID INT NOT NULL,
    SportID INT NOT NULL,
    Score VARCHAR(255),
    LeagueID INT,
    TicketPrice DECIMAL(19, 4),
    FOREIGN KEY (VenueID) REFERENCES Venues(VenueID) ON DELETE CASCADE,
    FOREIGN KEY (SportID) REFERENCES Sports(SportID) ON DELETE CASCADE,
    FOREIGN KEY (LeagueID) REFERENCES Leagues(LeagueID) ON DELETE SET NULL
);

-- StreamingServices Table
CREATE OR REPLACE TABLE StreamingServices (
    ServiceID INT AUTO_INCREMENT  NOT NULL PRIMARY KEY,
    Name VARCHAR(255) NOT NULL,
    Description TEXT NOT NULL
);

-- CompetingTeams Table
CREATE OR REPLACE TABLE CompetingTeams (
    CompetingTeamID INT AUTO_INCREMENT  NOT NULL PRIMARY KEY,
    EventID INT NOT NULL,
    TeamID INT NOT NULL,
    FOREIGN KEY (TeamID) REFERENCES Teams(TeamID) ON DELETE CASCADE,
    FOREIGN KEY (EventID) REFERENCES Events(EventID) ON DELETE CASCADE
);

-- EventStreams Table
CREATE OR REPLACE TABLE EventStreams (
    EventStreamID INT AUTO_INCREMENT  NOT NULL PRIMARY KEY,
    EventID INT NOT NULL,
    ServiceID INT NOT NULL,
    FOREIGN KEY (EventID) REFERENCES Events(EventID) ON DELETE CASCADE,
    FOREIGN KEY (ServiceID) REFERENCES StreamingServices(ServiceID) ON DELETE CASCADE
);

/*
Insert data into the Sports table
*/

INSERT INTO Sports (
    Name, 
    RulesManual,
    Description
)
VALUES
(
    "Football",
    "https://operations.nfl.com/media/5kvgzyss/2022-nfl-rulebook-final.pdf",
    "A team sport played on a rectangular field with goalposts at each end. Teams score by advancing the ball into the opposing team's end zone for a touchdown or kicking it through the opponent's goalposts for a field goal"
),
(
    "Soccer",
    "https://www.nfhs.org/media/5989347/2022-23-soccer-guide-ncaa-nfhs-ifab-final-update.pdf",
    "Known as football outside North America, it is a team sport played on a rectangular field with a goal at each end. Teams score by getting the ball into the opposing team's goal using any part of the body except the hands and arms."
),
(
    "Basketball",
    "https://ak-static-int.nba.com/wp-content/uploads/sites/3/2016/11/2016-2017-Rule-Book.pdf",
    "A team sport played on a rectangular court where the objective is to score by shooting a ball through the opponent's hoop. Each team tries to score while preventing the opposing team from scoring."
),
(
    "Baseball",
    "https://img.mlbstatic.com/mlb-images/image/upload/mlb/hhvryxqioipb87os1puw.pdf",
    "A bat-and-ball game played between two teams who take turns batting and fielding. The objective is to score runs by hitting the ball and running to a series of four bases arranged in a diamond shape."
),
(
    "Hockey",
    "https://media.nhl.com/site/asset/public/ext/2023-24/2023-24Rulebook.pdf",
    "A fast-paced team sport played on ice, where the objective is to score by shooting a puck into the opponent's net. Players use sticks to control, pass, and shoot the puck."
);

/*
Inserts data into the Leagues table
*/

INSERT INTO Leagues (
    Name, 
    YearFounded,
    Commisioner,
    SportID
)
VALUES
(
    "NFL",
    1920,
    "Roger Goodell",
    (SELECT SportID FROM Sports WHERE Name = "Football")
),
(
    "MLS",
    1993,
    "Don Garber",
    (SELECT SportID FROM Sports WHERE Name = "Soccer")
),
(
    "NBA",
    1946,
    "Adam Silver",
    (SELECT SportID FROM Sports WHERE Name = "Basketball")
),
(
    "MLB",
    1869,
    "Rob Manfred",
    (SELECT SportID FROM Sports WHERE Name = "Baseball")
),
(
    "NHL",
    1917,
    "Gary Bettman",
    (SELECT SportID FROM Sports WHERE Name = "Hockey")
),
(
    "CFL",
    1958,
    "Randy Ambrosie",
    (SELECT SportID FROM Sports WHERE Name = "Football")
);

/*
Insert data into the Venues table
*/

INSERT INTO Venues (
    Name, 
    Country,
    State,
    City,
    Capacity
)
VALUES
(
    "Lumen Field",
    "United States",
    "Washington",
    "Seattle",
    68740
),
(
    "Oracle Park",
    "United States",
    "California",
    "San Francisco",
    41915
),
(
    "Levi's Stadium",
    "United States",
    "California",
    "Santa Clara",
    68500
),
(
    "Dodger Stadium",
    "United States",
    "California",
    "Los Angeles",
    56000
),
(
    "Rose Bowl",
    "United States",
    "California",
    "Pasadena",
    88565
);

/*
Insert data into the Teams table
*/

INSERT INTO Teams (
    Name, 
    Coach,
    SportID
)
VALUES
(
    "Seattle Seahawks",
    "Pete Carroll",
    (SELECT SportID FROM Sports WHERE Name = "Football")
),
(
    "Cincinnati Bengals",
    "Zac Taylor",
    (SELECT SportID FROM Sports WHERE Name = "Football")
),
(
    "Seattle Sounders FC",
    "Brian Schmetzer",
    (SELECT SportID FROM Sports WHERE Name = "Soccer")
),
(
    "Portland Timbers",
    "Giovanni Savarese",
    (SELECT SportID FROM Sports WHERE Name = "Soccer")
),
(
    "FC Dallas",
    "Nico Estevez",
    (SELECT SportID FROM Sports WHERE Name = "Soccer")
);

/*
Insert data into the Players table
*/

INSERT INTO Players (
    Name, 
    Position,
    TeamID
)
VALUES
(
    "Russel Wilson",
    "Quarterback",
    (SELECT TeamID FROM Teams WHERE Name = "Seattle Seahawks")
),
(
    "Tee Higgins",
    "Wide Receiver",
    (SELECT TeamID FROM Teams WHERE Name = "Cincinnati Bengals")
),
(
    "Joao Paulo",
    "Midfielder",
    (SELECT TeamID FROM Teams WHERE Name = "Seattle Sounders FC")
),
(
    "Diego Chara",
    "Midfielder",
    (SELECT TeamID FROM Teams WHERE Name = "Portland Timbers")
),
(
    "Paul Arriola",
    "Forward",
    (SELECT TeamID FROM Teams WHERE Name = "FC Dallas")
);

/*
Insert data into the StreamingServices table
*/

INSERT INTO StreamingServices (
    Name, 
    Description
)
VALUES
(
    "Youtube TV",
    "YouTube offers live TV, on-demand video, and cloud-based DVR from more than 85 television networks, including major broadcast and cable channels."
),
(
    "Peacock",
    "Peacock offers a mix of live and on-demand content. It features TV shows, movies, news, sports, and exclusive original programming."
),
(
    "Fubo",
    "Fubo offers a wide range of sports channels and events."
),
(
    "Hulu",
    "Offers a vast library of on-demand TV shows, movies, and original content. It also offers a live TV option, which includes major broadcast and cable channels."
);

/*
Insert data into the Events table
*/

INSERT INTO Events (
    Name, 
    Date,
    VenueID,
    SportID,
    Score,
    LeagueID,
    TicketPrice
)
VALUES
(
    "Super Bowl",
    "2024-02-10 18:00:00",
    (SELECT VenueID FROM Venues WHERE Name = "Lumen Field"),
    (SELECT SportID FROM Sports WHERE Name = "Football"),
    "31-27",
    (SELECT LeagueID FROM Leagues WHERE Name = "NFL"),
    1000
),
(
    "MLS Final",
    "2024-07-12 20:00:00",
    (SELECT VenueID FROM Venues WHERE Name = "Levi's Stadium"),
    (SELECT SportID FROM Sports WHERE Name = "Soccer"),
    "2-1",
    (SELECT LeagueID FROM Leagues WHERE Name = "MLS"),
    130
),
(
    "MLS Regular Season",
    "2025-01-05 18:00:00",
    (SELECT VenueID FROM Venues WHERE Name = "Levi's Stadium"),
    (SELECT SportID FROM Sports WHERE Name = "Soccer"),
    NULL,
    (SELECT LeagueID FROM Leagues WHERE Name = "MLS"),
    30
);

/*
Insert data into the CompetingTeams table
*/

INSERT INTO CompetingTeams (
    EventID,
    TeamID
)
VALUES
(
    (SELECT EventID FROM Events WHERE Name = "Super Bowl"),
    (SELECT TeamID FROM Teams WHERE Name = "Seattle Seahawks")
),
(
    (SELECT EventID FROM Events WHERE Name = "Super Bowl"),
    (SELECT TeamID FROM Teams WHERE Name = "Cincinnati Bengals")
),
(
    (SELECT EventID FROM Events WHERE Name = "MLS Final"),
    (SELECT TeamID FROM Teams WHERE Name = "Seattle Sounders FC")
),
(
    (SELECT EventID FROM Events WHERE Name = "MLS Final"),
    (SELECT TeamID FROM Teams WHERE Name = "Portland Timbers")
),
(
    (SELECT EventID FROM Events WHERE Name = "MLS Regular Season"),
    (SELECT TeamID FROM Teams WHERE Name = "Seattle Sounders FC")
),
(
    (SELECT EventID FROM Events WHERE Name = "MLS Regular Season"),
    (SELECT TeamID FROM Teams WHERE Name = "FC Dallas")
);

/*
Insert data into the EventStreams table
*/

INSERT INTO EventStreams (
    EventID,
    ServiceID
)
VALUES
(
    (SELECT EventID FROM Events WHERE Name = "Super Bowl"),
    (SELECT ServiceID FROM StreamingServices WHERE Name = "Peacock")
),
(
    (SELECT EventID FROM Events WHERE Name = "Super Bowl"),
    (SELECT ServiceID FROM StreamingServices WHERE Name = "Hulu")
),
(
    (SELECT EventID FROM Events WHERE Name = "MLS Final"),
    (SELECT ServiceID FROM StreamingServices WHERE Name = "Youtube TV")
),
(
    (SELECT EventID FROM Events WHERE Name = "MLS Final"),
    (SELECT ServiceID FROM StreamingServices WHERE Name = "Fubo")
),
(
    (SELECT EventID FROM Events WHERE Name = "MLS Regular Season"),
    (SELECT ServiceID FROM StreamingServices WHERE Name = "Youtube TV")
);

SET FOREIGN_KEY_CHECKS=1;
COMMIT;