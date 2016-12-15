var mysql   = require('mysql');
var db  = require('./db_connection.js');

/* DATABASE CONFIGURATION */
var connection = mysql.createConnection(db.config);

exports.getAll = function(callback) {
    var query = 'SELECT * FROM workers;';

    connection.query(query, function(err, result) {
        callback(err, result);
    });
};

exports.getById = function(worker_id, callback) {
    var query = 'SELECT w.*, l.name FROM workers w ' +
        'LEFT JOIN library_workers lw ON lw.worker_id = w.worker_id ' +
        'LEFT JOIN library l ON l.lib_id = lw.lib_id ' +
        'WHERE w.worker_id = ?';
    var queryData = [worker_id];
    console.log(query);

    connection.query(query, queryData, function(err, result) {
        callback(err, result);
    });
};

exports.insert = function(params, callback) {
    var query = 'INSERT INTO workers (email, first_name, last_name) VALUES (?, ?, ?)';

    // the question marks in the sql query above will be replaced by the values of the
    // the data in queryData
    var queryData = [params.email, params.first_name, params.last_name];

    connection.query(query, queryData, function(err, result) {
        callback(err, result);
    });

}

exports.delete = function(worker_id, callback) {
    var query = 'DELETE FROM workers WHERE workers_id = ?';
    var queryData = [worker_id];

    connection.query(query, queryData, function(err, result) {
        callback(err, result);
    });

};
