var mysql   = require('mysql');
var db  = require('./db_connection.js');

/* DATABASE CONFIGURATION */
var connection = mysql.createConnection(db.config);

exports.getAll = function(callback) {
    var query = 'SELECT * FROM library;';

    connection.query(query, function(err, result) {
        callback(err, result);
    });
};

exports.getById = function(lib_id, callback) {
    var query = 'SELECT l.*, a.street, a.zip_code FROM library l ' +
        'LEFT JOIN library_address la on la.lib_id = l.lib_id ' +
        'LEFT JOIN address a on a.address_id = la.address_id ' +
        'WHERE l.library_id = ?';
    var queryData = [lib_id];
    console.log(query);

    connection.query(query, queryData, function(err, result) {
        callback(err, result);
    });
};

exports.insert = function(params, callback) {
    var query = 'INSERT INTO library (lib_name, address_id) VALUES (?, ?)';

    // the question marks in the sql query above will be replaced by the values of the
    // the data in queryData
    var queryData = [params.lib_name, params.address_id];

    connection.query(query, queryData, function(err, result) {
        callback(err, result);
    });

};

exports.delete = function(library_id, callback) {
    var query = 'DELETE FROM library WHERE library_id = ?';
    var queryData = [library_id];

    connection.query(query, queryData, function(err, result) {
        callback(err, result);
    });

};
