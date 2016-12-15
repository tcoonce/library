var express = require('express');
var router = express.Router();
var workers_dal = require('../model/members_dal');


// View All workers
router.get('/all', function(req, res) {
    workers_dal.getAll(function(err, result){
        if(err) {
            res.send(err);
        }
        else {
            res.render('workers/workersViewAll', { 'result':result });
        }
    });

});

// View the workers for the given id
router.get('/', function(req, res){
    if(req.query.worker_id == null) {
        res.send('worker_id is null');
    }
    else {
        workers_dal.getById(req.query.worker_id, function(err,result) {
            if (err) {
                res.send(err);
            }
            else {
                res.render('workers/workersViewById', {'result': result});
            }
        });
    }
});

// Return the add a new workers form
router.get('/add', function(req, res){
    // passing all the query parameters (req.query) to the insert function instead of each individually
    res.render('workers/workersAdd');
});

// View the workers for the given id
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
    else if(req.query.library_name== null) {
        res.send('A Library must be selected');
    }
    else {
        // passing all the query parameters (req.query) to the insert function instead of each individually
        workers_dal.insert(req.query, function(err,result) {
            if (err) {
                res.send(err);
            }
            else {
                //poor practice, but we will handle it differently once we start using Ajax
                res.redirect(302, '/workers/all');
            }
        });
    }
});

// Delete an workers for the given workers_id
router.get('/delete', function(req, res){
    if(req.query.worker_id == null) {
        res.send('worker_id is null');
    }
    else {
        workers_dal.delete(req.query.worker_id, function(err, result){
            if(err) {
                res.send(err);
            }
            else {
                //poor practice, but we will handle it differently once we start using Ajax
                res.redirect(302, '/workers/all');
            }
        });
    }
});

module.exports = router;