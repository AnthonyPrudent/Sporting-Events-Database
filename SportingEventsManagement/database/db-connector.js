/*
Citation for the following JavaScript code:
Date: 8/9/2024
Copied from
Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main 
*/

// ./database/db-connector.js

// Get an instance of mysql we can use in the app
var mysql = require('mysql')

// Create a 'connection pool' using the provided credentials
var pool = mysql.createPool({
    connectionLimit : 10,
    host            : '',
    user            : '',
    password        : '',
    database        : ''
})

// Export it for use in our application
module.exports.pool = pool;