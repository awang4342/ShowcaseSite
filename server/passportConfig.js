const User = require("./models/user");
const bcrypt = require("bcryptjs");
const localStrategy = require("passport-local").Strategy;

module.exports = function (passport) {
    passport.use(
        new localStrategy((username, password, done) => {
            console.log(username)
            User.findOne({ username: username }, (err, user) => {
                if (err) {
                    console.log("ERRPR" + err)
                    return done(null, false, { message: err })
                }
                if (!user) {
                    return done(null, false, { message: "WRONG USERNAME" })
                }
                bcrypt.compare(password, user.password, (err, res) => {
                    if (err) {
                        console.log("ERROR" + err)
                        return done(null, false, { message: err })
                    }
                    if (res == true) {
                        return done(null, user)
                    } else {
                        return done(null, false, { message: "Wrong password" })
                    }
                })
            })
        })
    )
    passport.serializeUser((user, done) => {
        console.log("SERIALIZING USER: " + user.id)
        done(null, user.id)
    })
    passport.deserializeUser((id, done) => {
        console.log("DESERIALIZING USER: " + id)
        User.findById(id, (err, user) => {
            const userInfo = {
                username: user.username
            }
            done(err, userInfo)
        })
    })
}