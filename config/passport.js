var LocalStrategy = require('passport-local').Strategy;
var passport = require('passport');
const firebaseConfig = require('./firebaseConfig');
// const firebaseAdmin = require('./firebaseAdmin');

passport.serializeUser((user, done) => {
    done(null, user);
})

passport.deserializeUser((id, done) => {
    firebaseConfig.auth().signInWithEmailAndPassword(id.user, id.pass)
        .then(function () {
            // success
            return done(null, id);
        })
        .catch(function (err) {
            return done(null, false);
        });
})

module.exports = function (passport) {
    passport.use(new LocalStrategy(
        (username, password, done) => {
            firebaseConfig.auth().signInWithEmailAndPassword(username, password)
                .then(function () {
                    // success
                    const user = {
                        user: username,
                        pass: password
                    }
                    return done(null, user);
                })
                .catch(function (err) {
                    return done(null, false);
                });
        }
    ))
}