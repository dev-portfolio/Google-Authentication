var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy

var gm = require('../model/googlemodel');
var configAuth = require('./uth')

module.exports = function(passport) {

passport.use(new GoogleStrategy({
        clientID: configAuth.googleAuth.clientId,
        clientSecret: configAuth.googleAuth.clientSecret,
        callbackURL: configAuth.googleAuth.callbackURL
    },
    function(accessToken, refreshToken, profile, done) {
        process.nextTick(function(){
            console.log(profile);
            // return done(null,profile);
            gm.findOne({email:  profile.emails[0].value}, function(err, user){


                if(err)
                { console.log("error occured while finding");
                    return done(err);
                }

                if(user)
                {  console.log("USER FOUND");
                if(profile.displayName != user.name){ user.name=profile.displayName;user.save()};
                    console.log(user);
                    return done(null, user);
                }




                else {
                    var newUser = new gm();
                    newUser._id = profile.id;
                    newUser.name = profile.displayName;
                    newUser.email = profile.emails[0].value;
                    // newUser.user = profile._id;

                    newUser.save(function(err){
                        if(err)
                            throw err;
                        return done(null, newUser);
                    });
                    console.log(profile);
                }
            });
        });
    }

));

    passport.serializeUser(function(user, done){
            done(null, user.id);
        });

        passport.deserializeUser(function(id, done){
            gm.findById(id, function(err, user){
                done(err, user);
            });
    });
}