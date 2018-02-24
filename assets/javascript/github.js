var express = require('express');
var passport = require('passport');
var Strategy = require('passport-github').Strategy;

passport.use(new Strategy({
    clientID: process.env.BOILERPLATE_ID,
    clientSecret: process.env.BOILERPLATE_SECRET,
    callbackURL: 'http://localhost:3000/login/github/callback'
}, function (accessToken, refreshToken, profile, cb) {
    User.findOrCreate({ githubId: profile.id }, function (err, user) {
        return cb(err, user);
    });
}));

passport.serializeUser(function (user, cb) {
    cb(null, user);
});

passport.deserializeUser(function (obj, cb) {
    cb(null, obj);
});

var app = express();    // create a new express app
app.use(express.static('public'))

app.use(require('morgan')('combined'));
app.use(require('cookie-parser')());
app.use(require('body-parser').urlencoded({ extended: true }));
app.use(require('express-session')({ secret: 'keyboard cat', resave: true, saveUninitialized: true }));

app.use(passport.initialize());
app.use(passport.session());

// routes

app.get('/', function (req, res) {
    res.sendFile('index.html', { user: req.user });
});

app.get('/login', function (req, res) {
    res.sendFile('login.html');
});

app.get('/login/github',
    passport.authenticate('github')
);

app.get('/login/github/callback',
    passport.authenticate('github', { failureRedirect: '/login' }),
    function (req, res) {
        res.redirect('/');
    }
);

app.get('profile',
    require('connect-ensure-login').ensureLoggedIn(),
    function (req, res) {
        res.sendFile('profile.html', { user: req.user });
    }
);

var port = process.env.PORT || 3000;

app.listen(port);
console.log('Listening at port ' + port);