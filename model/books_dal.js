var mysql   = require('mysql');
var db  = require('./db_connection.js');

/* DATABASE CONFIGURATION */
var connection = mysql.createConnection(db.config);

exports.getAll = function(callback) {
    var query = 'SELECT * FROM books;';

    connection.query(query, function(err, result) {
        callback(err, result);
    });
};

exports.getById = function(book_id, callback) {
    var query = 'SELECT b.*, l.name FROM books b ' +
        'LEFT JOIN library_books lb ON lb.book_id = b.book_id ' +
        'LEFT JOIN library l ON l.lib_id = lb.lib_id ' +
        'where b.book_id = ?' ;
    var queryData = [book_id];
    console.log(query);

    connection.query(query, queryData, function(err, result) {
        callback(err, result);
    });
};

exports.insert = function(params, callback) {
    var query = 'INSERT INTO book (title, dewey_num) VALUES (?, ?)';

    // the question marks in the sql query above will be replaced by the values of the
    // the data in queryData
    var queryData = [params.title, params.dewey_num];

    connection.query(query, queryData, function(err, result) {
        callback(err, result);
    });

};

exports.delete = function(book_id, callback) {
    var query = 'DELETE FROM book WHERE book_id = ?';
    var queryData = [book_id];

    connection.query(query, queryData, function(err, result) {
        callback(err, result);
    });

};

exports.edit = function(member_id, book_id, callback) {
    var query = 'CALL checkOutBook(?, ?)';
    var queryData = [member_id, book_id];

    connection.query(query, queryData, function(err, result) {
        callback(err, result);
    });
}