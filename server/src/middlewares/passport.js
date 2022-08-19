const passport = require("passport");
const GoogleStrategy = require('passport-google-oidc');
const User = require("../models/user");


passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK_URL
    }, async (req, accessToken, refreshToken, profile, done) => {
    
    const user = await User.findOne({ googleId: profile.id });
    if(user) {
        done(null, user);
    }
    else {
        const newUser = new User({
            name: profile.displayName,
            googleId: profile.id,
            email: profile.emails[0].value,
            picture: profile.photos[0].value
        });
        await newUser.save();
        done(null, newUser);
    }

    done(null, profile); 
}));

// passport.use(new FacebookStrategy({
//     clientID: FACEBOOK_APP_ID,
//     clientSecret: FACEBOOK_APP_SECRET,
//     callbackURL: "http://localhost:3000/auth/facebook/callback"
//   },
//   function(accessToken, refreshToken, profile, cb) {
//     User.findOrCreate({ facebookId: profile.id }, function (err, user) {
//       return cb(err, user);
//     });
//   }
// ));

passport.serializeUser((user, done) => {
    done(null, user);
}
);


passport.deserializeUser(async (user, done) => {
    done(null, user);
    }
);


module.exports = passport;