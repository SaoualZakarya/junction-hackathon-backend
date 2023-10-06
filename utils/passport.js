
const passport = require("passport");
const LocalStrategy = require("passport-local");

const User = require("../model/userModel");
const { validatePassword } = require("./passwordUtils");

passport.use(new LocalStrategy({
    usernameField: "userName"
}, async (userName, password, done) => {
    try {
        const resultUser = await User.findOne({
            $or: [{ userName: userName }, { email: userName }],
        });

        if (!resultUser) {
            return done(null, false, { message: "Invalid Username or Email" });
        }

        if (validatePassword(password, resultUser.hash, resultUser.salt)) {
            return done(null, resultUser);
        } else {
            return done(null, false, { message: "Incorrect Password" });
        }
    } catch (error) {
        return done(error);
    }
}));



passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((userID, done) => {
    User.findById(userID)
        .then((user) => {
            done(null, user)
        }).catch((err) => done(err));
});
