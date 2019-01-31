var express = require('express');
var router = express.Router();
var passport = require('passport');
require('../config/googlestrategy')(passport);



var passport = require('passport');
require('../config/googlestrategy')(passport);


router.get('/auth/google', passport.authenticate('google', { scope:['profile','email'] }));

router.get('/auth/google/callback',
    passport.authenticate('google', { failureRedirect: '/login' }),
    function(req, res) {
        // console.log('Check from index.js',req.user);
        // Successful authentication, redirect home.
        res.redirect('/googleinformation');
    });

router.get('/googleinformation',function(req,res,next){res.render('googleinformation',{user:req.user});});

router.post('/inputjs',function(req,res,next){
    var us=req.user;
    // myinput=req.body.inputjs;
     realinput={name:req.body.inputjs}
    us.Js1.push(realinput);
    res.send(req.body.inputjs);
    us.save();
})

module.exports = router;