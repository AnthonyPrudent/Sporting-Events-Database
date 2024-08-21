/*
Citation for the following JavaScript code:
Date: 8/9/2024
Adapted from
Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main 
Reworked the request to better accomodate the attributes of the corresponding table.
*/

// Sends request to delete entry from the database then updates the UI
function deleteEventStream(EventStreamID) {

    let link = '/delete-eventstream-ajax/';
    let data = {
      id: EventStreamID
    };
  
    $.ajax({
      url: link,
      type: 'DELETE',
      data: JSON.stringify(data),
      contentType: "application/json; charset=utf-8",
      success: function(result) {
        deleteEventStreamsRow(EventStreamID);
        }
    });
}
  
// Removes the entry from the user-facing table
function deleteEventStreamsRow(EventStreamID) {
    
    let table = document.getElementById("eventstreams-table");
    for (let i = 0, row; row = table.rows[i]; i++) {
        if (table.rows[i].getAttribute("id") == EventStreamID) {
            table.deleteRow(i);
            deleteEventStreamsDropDownMenu(EventStreamID)
            break;
        }
    }
}

// Removes the deleted entry from the dropdown lists
function deleteEventStreamsDropDownMenu(EventStreamID) {
    let selectMenu = document.getElementById("");
    for (let i = 0; i < selectMenu.length; i++) {
        if (Number(selectMenu.options[i].attributes[0].value) === Number(EventStreamID)) {
            selectMenu[i].remove();
        }
    }
}