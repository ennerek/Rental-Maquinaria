const { Router } = require('express');
const { login, googleSignIn, register, verifyAccount } = require('../controllers/auth');

const config = require('../config');
const router = Router();

const passport = require('passport');



router.post('/login',login);

router.post('/register',register);

router.post('/googleSignIn', googleSignIn);


router.put('/verifyAccount/:userId', verifyAccount);

// const { googleSignIn, register, login } = require('../controllers/auth');

// router.post('/google', googleSignIn);

// const passport = require('passport');
// const config  = require('../config');
// const User = require('../models/user');

// const FacebookStrategy = require('passport-facebook').Strategy;
// const GoogleStrategy = require('passport-google-oidc');




// passport.use(new FacebookStrategy({
//     clientID: "ACEBOOK_APP_ID",
//     clientSecret: "FACEBOOK_APP_SECRET",
//     callbackURL: "http://localhost:3000/auth/facebook/callback"
//   },
//   function(accessToken, refreshToken, profile, cb) {
//     User.findOrCreate({ facebookId: profile.id }, function (err, user) {
//       return cb(err, user);
//     });
//   }
// ));


// router.get('/', (req, res) => {
//     res.redirect('login');
// });
    

// router.get('/login', (req, res) => {
//     res.render('login');
// });


// router.post('/login',login);


// router.get('/logout', (req, res) => {
//     res.render('login');
// });
        




// router.get('/google', passport.authenticate('google', {
//     scope: [ 'profile', 'email' ]
//     }
//     ));

// router.get('/google/callback', passport.authenticate('google', {
//     successRedirect: '/',
//     failureRedirect: '/login'
//     }
//     ));    

// router.get('/auth/facebook',
//   passport.authenticate('facebook'));

// router.get('/auth/facebook/callback',
//   passport.authenticate('facebook', { failureRedirect: '/login' }),
//   function(req, res) {
//     res.redirect('/');
//   });




passport.serializeUser(function(user, cb) {
  process.nextTick(function() {
    cb(null, user);
  });
});

passport.deserializeUser(function(user, cb) {
  process.nextTick(function() {
    return cb(null, user);
  });
});

module.exports = router;

