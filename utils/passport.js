
const passport = require("passport");
const LocalStrategy = require("passport-local");

const User = require("../model/userModel");
const { validatePassword } = require("./passwordUtils");

passport.use(new LocalStrategy({
    usernameField: "userName"
}, async (userName, password, done) => {
    try {
        // console.log(userName,password)
        const resultUser = await User.findOne({
            $or: [{ userName: userName }, { email: userName }],
        });
        //TODO :: MAKE ERROR HENDLING
        // console.log(resultUser)

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


// //admin authentication
// passport.use('admin-local',
//     new LocalStrategy(async (username, password, done) => {
//         const resultUser = await Student.findOne({
//             $or: [{ username: username }, { email: username }],
//         });

//         if (!resultUser)
//             return done(
//                 { message: "Invalid Credentials" },
//                 false,
//                 "Invalid Credentials"
//             );

//         if (validatePassword(password, resultUser.hash, resultUser.salt)) {

//             if (!resultUser.confirmedEmail) {
//                 const result = await SendConfirmationEmail(resultUser.id);
//                 if (!result) {
//                     return done(
//                         { message: "something went wrong with email" },
//                         false,
//                         "something went wrong with email"
//                     )
//                 }

//                 return done(
//                     { message: "Please Confirm Your Email" },
//                     false,
//                     "Please Confirm Your E-mail"
//                 );
//             }

//             if(!resultUser.role ==="admin")
//                 return done({message: "You Dont have access"}, false, "You Dont have access");

//             return done(null, resultUser);
//         } else
//             return done(
//                 { message: "Invalid Credentials" },
//                 false,
//                 "Invalid Credentials"
//             )
//     })
// )

passport.serializeUser((user, done) => {
    console.log('serializeUser ',user);
    done(null, user.id);
});

passport.deserializeUser((userID, done) => {
    User.findById(userID)
        .then((user) => {
            console.log('deserializeUser ',user)
            done(null, user)
        }).catch((err) => done(err));
});
