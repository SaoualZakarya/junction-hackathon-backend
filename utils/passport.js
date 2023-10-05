/** @format */

const passport = require("passport");
const LocalStrategy = require("passport-local");

const Student = require("../module/studentModule");
const { validatePassword } = require("./passwordUtils");


// client authentication
passport.use( "student",
    new LocalStrategy({
        usernameField: "userName"
    }, async (username, password, done) => {
        const resultUser = await Student.findOne({
            $or: [{ username: username }, { email: username }],
        });

        if (!resultUser)
            return done(
                { message: "Invalid Credentials" },
                false,
                "Invalid Credentials"
            );

        if (validatePassword(password, resultUser.hash, resultUser.salt)) 
            return done(null, resultUser);
        else
            return done(
                { message: "Invalid Credentials" },
                false,
                "Invalid Credentials"
            )
    })
);

//admin authentication
passport.use('admin-local',
    new LocalStrategy(async (username, password, done) => {
        const resultUser = await Student.findOne({
            $or: [{ username: username }, { email: username }],
        });

        if (!resultUser)
            return done(
                { message: "Invalid Credentials" },
                false,
                "Invalid Credentials"
            );

        if (validatePassword(password, resultUser.hash, resultUser.salt)) {

            if (!resultUser.confirmedEmail) {
                const result = await SendConfirmationEmail(resultUser.id);
                if (!result) {
                    return done(
                        { message: "something went wrong with email" },
                        false,
                        "something went wrong with email"
                    )
                }


                return done(
                    { message: "Please Confirm Your Email" },
                    false,
                    "Please Confirm Your E-mail"
                );
            }

            if(!resultUser.isAdmin)
                return done({message: "You Dont have access"}, false, "You Dont have access");

            return done(null, resultUser);
        } else
            return done(
                { message: "Invalid Credentials" },
                false,
                "Invalid Credentials"
            )
    })
)

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((userID, done) => {
    User.findById(userID)
        .then((user) => done(null, user))
        .catch((err) => done(err));
});
