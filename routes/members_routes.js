var express = require('express');
var router = express.Router();
var members_dal = require('../model/members_dal');


// View All members
router.get('/all', function(req, res) {
    members_dal.getAll(function(err, result){
        if(err) {
            res.send(err);
        }
        else {
            res.render('members/membersViewAll', { 'result':result });
        }
    });

});

// View the members for the given id
router.get('/', function(req, res){
    if(req.query.member_id == null) {
        res.send('member_id is null');
    }
    else {
        members_dal.getById(req.query.member_id, function(err,result) {
            if (err) {
                res.send(err);
            }
            else {
                res.render('members/membersViewById', {'result': result});
            }
        });
    }
});

// Return the add a new members form
router.get('/add', function(req, res){
    // passing all the query parameters (req.query) to the insert function instead of each individually
    res.render('members/membersAdd');
});

// View the members for the given id
router.get('/insert', function(req, res){
    // simple validation
    if(req.query.first_name == null) {
        res.send('First Name must be provided.');
    }
    else if(req.query.last_name == null) {
        res.send('Last Name must be provided.');
    }
    else if(req.query.email== null) {
        res.send('An Email must be selected');
    }
    else {
        // passing all the query parameters (req.query) to the insert function instead of each individually
        members_dal.insert(req.query, function(err,result) {
            if (err) {
                res.send(err);
            }
            else {
                //poor practice, but we will handle it differently once we start using Ajax
                res.redirect(302, '/members/all');
            }
        });
    }
});

// Delete an members for the given member_id
router.get('/delete', function(req, res){
    if(req.query.member_id == null) {
        res.send('member_id is null');
    }
    else {
        members_dal.delete(req.query.member_id, function(err, result){
            if(err) {
                res.send(err);
            }
            else {
                //poor practice, but we will handle it differently once we start using Ajax
                res.redirect(302, '/members/all');
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