# Sporting Events Management System
A database driven website to manage sporting events with venues, teams, sports, streaming services, leagues, and players.
Note: Not all tables on the web application have all CRUD operations implemented. Only the Events and Leagues table are implemented completely.

### Technologies:
- MariaDB
- NodeJS
- Express
- Handlebars
- Ajax
- MySQL
- HTML
- CSS
- JavaScript

### Running the Web Application Locally:
- Import/Run the queries located in the DDL.sql file in your database.

- Connect to your database using db-connector.js:
```
host            : 'yourHost',
user            : 'yourUsername',
password        : 'yourPassword',
database        : 'yourDatabase'
```

- Run the following command while in the SportingEventsManagement directory:
```
npm install
```

- Run the following command to run the web application:
```
node app.js
```

- Connect to the web application (http://localhost:53082)

### Citation for the following code:
Date: 8/9/2024
Adapted from
Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main 
The JavaScript and Handlebar code was adapted to fit the context of the sporting event management database. 
The SQL queries were changed to send the necessary data to render the database on the Handlebar pages. 
Reworked drop down Javascript code to include the deletion, addition, and update of multiple drop down menus.
Reconfigured HTML inputs to correctly recieve the correct data types for the sporting event database.
In the events page, changed dynamically updated table rows to update more than one table.
