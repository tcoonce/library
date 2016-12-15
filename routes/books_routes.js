var express = require('express');
var router = express.Router();
var books_dal = require('../model/books_dal');


// View All books
router.get('/all', function(req, res) {
    books_dal.getAll(function(err, result){
        if(err) {
            res.send(err);
        }
        else {
            res.render('books/booksViewAll', { 'result':result });
        }
    });

});

// View the books for the given id
router.get('/', function(req, res){
    if(req.query.book_id == null) {
        res.send('book_id is null');
    }
    else {
        books_dal.getById(req.query.book_id, function(err,result) {
            if (err) {
                res.send(err);
            }
            else {
                res.render('books/booksViewById', {'result': result});
            }
        });
    }
});

// Return the add a new books form
router.get('/add', function(req, res){
    // passing all the query parameters (req.query) to the insert function instead of each individually
    res.render('books/booksAdd');
});

// View the books for the given id
router.get('/insert', function(req, res){
    // simple validation
    if(req.query.title == null) {
        res.send('Title must be provided.');
    }

    else {
        // passing all the query parameters (req.query) to the insert function instead of each individually
        books_dal.insert(req.query, function(err,result) {
            if (err) {
                res.send(err);
            }
            else {
                //poor practice, but we will handle it differently once we start using Ajax
                res.redirect(302, '/books/all');
            }
        });
    }
});

// Delete an account for the given books_id
router.get('/delete', function(req, res){
    if(req.query.book_id == null) {
        res.send('book_id is null');
    }
    else {
        books_dal.delete(req.query.book_id, function(err, result){
            if(err) {
                res.send(err);
            }
            else {
                //poor practice, but we will handle it differently once we start using Ajax
                res.redirect(302, '/books/all');
            }
        });
    }
});


router.get('/change', function(req, res){
    if(req.query.book_id == null) {
        res.send('book_id is null');
    }
    else {
        books_dal.getById(req.query.book_id, function(err,result) {
            if (err) {
                res.send(err);
            }
            else {
                res.render('books/booksViewChange', {'result': result});
            }
        });
    }
});


router.get('/edit', function(req, res){
   if(req.query.member_id == null) {
       res.sent('Your member_id is not available');
   }
   else{
       books.dal.edit(req.query.member_id, req.query.book_id, function(err, result){
           if(err) {
               res.send(err);
           }
           else {
               res.redirect(302, '/books/all');
           }
       });
   }
});

module.exports = router;