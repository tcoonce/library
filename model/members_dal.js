var mysql   = require('mysql');
var db  = require('./db_connection.js');

/* DATABASE CONFIGURATION */
var connection = mysql.createConnection(db.config);

exports.getAll = function(callback) {
    var query = 'SELECT * FROM members;';

    connection.query(query, function(err, result) {
        callback(err, result);
    });
};

exports.getById = function(member_id, callback) {
    var query = 'SELECT m.*, l.name FROM members m ' +
        'LEFT JOIN library_members lm ON lm.member_id = m.member_id ' +
        'LEFT JOIN library l ON l.lib_id = lm.lib_id ' +
        'WHERE m.member_id = ?';
    var queryData = [member_id];
    console.log(query);

    connection.query(query, queryData, function(err, result) {
        callback(err, result);
    });
};

exports.insert = function(params, callback) {
    var query = 'INSERT INTO members (email, first_name, last_name, fees) VALUES (?, ?, ?, ?)';

    // the question marks in the sql query above will be replaced by the values of the
    // the data in queryData
    var queryData = [params.email, params.first_name, params.last_name, params.fees];

    connection.query(query, queryData, function(err, result) {
        callback(err, result);
    });

}

exports.delete = function(member_id, callback) {
    var query = 'DELETE FROM members WHERE members_id = ?';
    var queryData = [member_id];

    connection.query(query, queryData, function(err, result) {
        callback(err, result);
    });

};


