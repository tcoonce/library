var express = require('express');
var router = express.Router();
var movies_dal = require('../model/movies_dal');


// View All movies
router.get('/all', function(req, res) {
    movies_dal.getAll(function(err, result){
        if(err) {
            res.send(err);
        }
        else {
            res.render('movies/moviesViewAll', { 'result':result });
        }
    });

});

// View the movies for the given id
router.get('/', function(req, res){
    if(req.query.movie_id == null) {
        res.send('movie_id is null');
    }
    else {
        movies_dal.getById(req.query.movie_id, function(err,result) {
            if (err) {
                res.send(err);
            }
            else {
                res.render('movies/moviesViewById', {'result': result});
            }
        });
    }
});

// Return the add a new movies form
router.get('/add', function(req, res){
    // passing all the query parameters (req.query) to the insert function instead of each individually
    res.render('movies/moviesAdd');
});

// View the movies for the given id
router.get('/insert', function(req, res){
    // simple validation
    if(req.query.title == null) {
        res.send('Title must be provided.');
    }

    else {
        // passing all the query parameters (req.query) to the insert function instead of each individually
        movies_dal.insert(req.query, function(err,result) {
            if (err) {
                res.send(err);
            }
            else {
                //poor practice, but we will handle it differently once we start using Ajax
                res.redirect(302, '/movies/all');
            }
        });
    }
});

// Delete an account for the given movies_id
router.get('/delete', function(req, res){
    if(req.query.movie_id == null) {
        res.send('movie_id is null');
    }
    else {
        movies_dal.delete(req.query.movie_id, function(err, result){
            if(err) {
                res.send(err);
            }
            else {
                //poor practice, but we will handle it differently once we start using Ajax
                res.redirect(302, '/movies/all');
            }
        });
    }
});

module.exports = router;