/*
Names : Abdulelah Alanazi - Mei Murakami -  Anthony Prudent
DESC: This SQL script manipulates data in a sports management database. 
*/

/*
Manipulates data in the Events table
*/

-- Display the content of the Events table
SELECT Events.EventID, Events.Name, Events.Date, Venues.Name AS Venue, Sports.Name AS Sport, Events.Score, Leagues.Name AS League, Events.TicketPrice
FROM Events
JOIN Venues ON Events.VenueID = Venues.VenueID
JOIN Sports ON Events.SportID = Sports.SportID
LEFT JOIN Leagues ON Events.LeagueID = Leagues.LeagueID
ORDER BY EventID ASC;

-- Add a new event
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
    ~Name_Input,
    ~DateTime_Input,
    ~VenueID_Dropdown_Input,
    ~SportID_Dropdown_Input,
    Score_Input,
    ~LeagueID_Dropdown_Input,
    ~TicketPrice_Input
);

-- update event's data using the update event form (LeagueID can be updated to null)
UPDATE Events 
SET 
Name = ~Name_Input, 
Date= ~DateTime_Input, 
VenueID = ~VenueID_Dropdown_Input, 
SportID = ~SportID_Dropdown_Input, 
Score = ~Score_Input, 
LeagueID = ~LeagueID_Dropdown_Input, 
TicketPrice = ~TicketPrice_Input 
WHERE EventID= ~EventID_from_the_update_form_dropdown

-- Delete an event
DELETE FROM Events WHERE EventID = ~EventID_Input

/*
Manipulates data in the CompetingTeams table
*/

-- Display the content of the CompetingTeams table
SELECT CompetingTeams.CompetingTeamID, Events.Name AS Event, Teams.Name as Team
FROM CompetingTeams
JOIN Events ON CompetingTeams.EventID = Events.EventID
JOIN Teams ON CompetingTeams.TeamID = Teams.TeamID
ORDER BY CompetingTeamID ASC;

-- Add a new competing team (M-to-M relationship addition)
INSERT INTO CompetingTeams (
    EventID,
    TeamID
)
VALUES
(
   EventID_Dropdown_Input,
    TeamID_Dropdown_Input
);

/*
Manipulates data in the Teams table
*/

-- Display the content of the Teams table
SELECT Teams.TeamID, Teams.Name, Teams.Coach, Sports.Name AS Sport
FROM Teams
JOIN Sports ON Teams.SportID = Sports.SportID
ORDER BY TeamID ASC;

-- Add a new team 
INSERT INTO Teams (
    Name, 
    Coach,
    SportID
)
VALUES
(
    ~Name_Input,
    ~Coach_Input,
    ~SportID_Dropdown_Input
);

-- Get the TeamID and name for dropdown input
SELECT TeamID, Name FROM Teams;

/*
Manipulates data in the Players table
*/

-- Display the content of the Players table
SELECT Players.PlayerID, Players.Name, Players.Position, Teams.Name AS Team
FROM Players
JOIN Teams ON Players.TeamID = Teams.TeamID
ORDER BY PlayerID ASC;

-- Add a new player
INSERT INTO Players (
    Name, 
    Position,
    TeamID
)
VALUES
(
    ~Name_Input,
    ~Position_Input,
    ~TeamID_Dropdown_Input
);

/*
Manipulates data in the EventStreams table
*/

-- Display the content of the EventStreams table 
SELECT EventStreams.EventStreamID, Events.Name AS Event, StreamingServices.Name as StreamingService
FROM EventStreams
JOIN Events ON EventStreams.EventID = Events.EventID
JOIN StreamingServices ON EventStreams.ServiceID = StreamingServices.ServiceID
ORDER BY EventStreamID ASC;

-- Add new streamed event (M-to-M relationship addition)
INSERT INTO EventStreams (
    EventID,
    ServiceID
)
VALUES
(
    ~EventID_Dropdown_Input,
    ~ServiceID_Dropdown_Input
);

-- update a streamed event's data using the update EventStreams form
UPDATE EventStreams SET EventID = ~EventID_Dropdown_Input, ServiceID= ~ServiceID_Dropdown_Input WHERE EventStreamID= ~EventStreamID_from_the_update_form_Dropdown

-- Dissociate a streaming service from an event (M-to-M relationship deletion)
DELETE FROM EventStreams WHERE EventStreamID = ~EventStreamID_selected

/*
Manipulates data in the StreamingServices table
*/

-- Display the content of the StreamingServices table
SELECT * FROM StreamingServices;

-- Add a new streaming service
INSERT INTO StreamingServices (
    Name, 
    Description
)
VALUES
(
    ~Name_Input,
    ~Description_Input
);

-- Get ServiceID and name for dropdown input
SELECT ServiceID, Name FROM StreamingServices;

/*
Manipulates data in the Venues table
*/

-- Display the content of the Venues table
SELECT * FROM Venues
ORDER BY VenueID ASC;

-- Add a new venue
INSERT INTO Venues (
    Name, 
    Country,
    State,
    City,
    Capacity
)
VALUES
(
    ~Name_Input,
    ~Country_Input,
    ~State_Input,
    ~City_Input,
    ~Capacity_Input
);

-- Get VenueID and name for dropdown input
SELECT VenueID, Name FROM Venues;

/*
Manipulates data in the Leagues table
*/

-- Display the content of the Leagues table
SELECT Leagues.LeagueID, Leagues.Name, Leagues.YearFounded, Leagues.Commisioner, Sports.Name AS Sport
FROM Leagues
JOIN Sports ON Leagues.SportID = Sports.SportID
ORDER BY LeagueID ASC;

-- Add a new league
INSERT INTO Leagues (
    Name, 
    YearFounded,
    Commisioner,
    SportID
)
VALUES
(
    ~Name_Input,
    ~YearFounded_Input,
    ~Comissioner_Input,
    ~SportID_Dropdown_Input
);

-- Delete a league
DELETE FROM Leagues WHERE LeagueID = ~LeagueID_Input

-- Edit a league
UPDATE Leagues 
SET 
Name = ~Name_Input, 
YearFounded = ~YearFounded_Input, 
Commisioner = ~Comissioner_Input, 
SportID = SportID_Dropdown_Input 
WHERE LeagueID = LeagueID_Input_Dropdown;


-- Get the LeagueID and name for dropdown input
SELECT LeagueID, Name FROM Leagues;

/*
Manipulates data in the Sports table
*/

-- Display the content of the Sports table
SELECT * FROM Sports
ORDER BY SportID ASC;

-- Add a mew sport
INSERT INTO Sports (
    Name, 
    RulesManual,
    Description
)
VALUES
(
    ~Name_Input,
    ~RulesManual_Input,
    ~Description_Input
);

-- Get the SportID and name for dropdown input
SELECT SportID, Name FROM Sports;