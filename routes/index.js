var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();

var gm = require('../model/googlemodel');

mongoose.connect('mongodb://localhost/test');
var db=mongoose.connection;
db.once('open',function(){console.log("connected to database");});
db.on('error',function(err){console.log(err);});



/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'GOOGLE AUTHENTICATION' });
});


router.get('/lists', ensureauthenticated, function(req, res, next) {
    gm.find().then(function (blogs) {
        res.render('userlist', {go: blogs});
    });
});

function ensureauthenticated(req,res,next){
    if(req.isAuthenticated()){
        return next()
    } else {
        res.redirect('/')
    }
}

module.exports = router;
