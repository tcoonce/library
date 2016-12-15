var mysql   = require('mysql');
var db  = require('./db_connection.js');

/* DATABASE CONFIGURATION */
var connection = mysql.createConnection(db.config);

exports.getAll = function(callback) {
    var query = 'SELECT * FROM movies;';

    connection.query(query, function(err, result) {
        callback(err, result);
    });
};

exports.getById = function(movie_id, callback) {
    var query = 'SELECT m.*, l.name FROM movies m ' +
        'LEFT JOIN library_movies lm ON lm.movie_id = m.movie_id ' +
        'LEFT JOIN library l ON l.lib_id = lm.lib_id ' +
        'where m.movie_id = ?' ;
    var queryData = [movie_id];
    console.log(query);

    connection.query(query, queryData, function(err, result) {
        callback(err, result);
    });
};

exports.insert = function(params, callback) {
    var query = 'INSERT INTO movies (title, dewey_num) VALUES (?, ?)';

    // the question marks in the sql query above will be replaced by the values of the
    // the data in queryData
    var queryData = [params.title, params.dewey_num];

    connection.query(query, queryData, function(err, result) {
        callback(err, result);
    });

}

exports.delete = function(movie_id, callback) {
    var query = 'DELETE FROM movies WHERE movies_id = ?';
    var queryData = [movie_id];

    connection.query(query, queryData, function(err, result) {
        callback(err, result);
    });

};