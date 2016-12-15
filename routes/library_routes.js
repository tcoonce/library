var express = require('express');
var router = express.Router();
var library_dal = require('../model/library_dal');
var address_dal = require('../model/address_dal');


// View All companies
router.get('/all', function(req, res) {
    library_dal.getAll(function(err, result){
        if(err) {
            res.send(err);
        }
        else {
            res.render('library/libraryViewAll', { 'result':result });
        }
    });

});

// View the library for the given id
router.get('/', function(req, res){
    if(req.query.lib_id == null) {
        res.send('lib_id is null');
    }
    else {
        library_dal.getById(req.query.lib_id, function(err,result) {
            if (err) {
                res.send(err);
            }
            else {
                res.render('library/libraryViewById', {'result': result});
            }
        });
    }
});

// Return the add a new library form
router.get('/add', function(req, res){
    // passing all the query parameters (req.query) to the insert function instead of each individually
    address_dal.getAll(function(err,result) {
        if (err) {
            res.send(err);
        }
        else {
            res.render('library/libraryAdd', {'address': result});
        }
    });
});

// View the library for the given id
router.get('/insert', function(req, res){
    // simple validation
    if(req.query.lib_name == null) {
        res.send('Library Name must be provided.');
    }
    else if(req.query.address_id == null) {
        res.send('An Address must be selected');
    }
    else {
        // passing all the query parameters (req.query) to the insert function instead of each individually
        library_dal.insert(req.query, function(err,result) {
            if (err) {
                res.send(err);
            }
            else {
                //poor practice, but we will handle it differently once we start using Ajax
                res.redirect(302, '/library/all');
            }
        });
    }
});

// Delete an library for the given library_id
router.get('/delete', function(req, res){
    if(req.query.lib_id == null) {
        res.send('lib_id is null');
    }
    else {
        library_dal.delete(req.query.lib_id, function(err, result){
            if(err) {
                res.send(err);
            }
            else {
                //poor practice, but we will handle it differently once we start using Ajax
                res.redirect(302, '/library/all');
            }
        });
    }
});

module.exports = router;
